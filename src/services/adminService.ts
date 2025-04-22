import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import { onError } from '@/utils/errorsHandler';
import { getMappedSort } from '@/utils/apiSortMapping';
import { getMappedMessage } from '@/utils/resMessageMapping';
import useAxiosIns from '@/hooks/useAxiosIns';
import toastConfig from '@/configs/toast';

export type AdminSortAndFilterParams = {
  searchName: string;
  searchEmail: string;
  searchPhoneNumber: string;
  sort: string;
  range: string[] | any[] | undefined;
};

const adminService = ({ enableFetching }: { enableFetching: boolean }) => {
  const queryClient = useQueryClient();
  const axios = useAxiosIns();
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const buildQuery = ({ searchName, searchEmail, searchPhoneNumber, sort, range }: AdminSortAndFilterParams) => {
    const query: any = {};
    if (searchName) query.name = searchName.trim();
    if (searchEmail) query.email = searchEmail.trim();
    if (searchPhoneNumber) query.phoneNumber = searchPhoneNumber.trim();
    if (range) {
      if (range[0]) query.startTime = dayjs(range[0]).format('YYYY-MM-DD');
      if (range[1]) query.endTime = dayjs(range[1]).format('YYYY-MM-DD');
    }
    setQuery(JSON.stringify(query));
    if (sort) setSort(JSON.stringify(getMappedSort(sort)));
  };

  const searchAdminsQuery = useQuery({
    queryKey: ['search-admins', query, sort],
    queryFn: () => {
      return axios.get<IResponseData<IAdmin[]>>(
        `/personnel/admins?skip=${limit * (page - 1)}&limit=${limit}&filter=${query}&sort=${sort}`
      );
    },
    enabled: false,
  });

  useEffect(() => {
    if (searchAdminsQuery.isSuccess && searchAdminsQuery.data) {
      setAdmins(searchAdminsQuery.data.data?.data);
      setTotal(searchAdminsQuery.data.data?.total as number);
    }
  }, [searchAdminsQuery.isSuccess, searchAdminsQuery.data]);

  const getAllAdminsQuery = useQuery({
    queryKey: ['admins', page, limit],
    queryFn: () => {
      if (!isSearching) {
        return axios.get<IResponseData<IAdmin[]>>(
          `/personnel/admins?skip=${limit * (page - 1)}&limit=${limit}`
        );
      }
    },
    enabled: enableFetching,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (getAllAdminsQuery.isSuccess && getAllAdminsQuery.data && !isSearching) {
      setAdmins(getAllAdminsQuery.data.data?.data);
      setTotal(getAllAdminsQuery.data.data?.total as number);
    }
  }, [getAllAdminsQuery.isSuccess, getAllAdminsQuery.data]);

  const onFilterSearch = () => {
    setPage(1);
    setIsSearching(true);
    setTimeout(() => searchAdminsQuery.refetch(), 300);
  };

  const onResetFilterSearch = () => {
    setPage(1);
    setIsSearching(false);
    setQuery('');
    setSort('');
    setTimeout(() => getAllAdminsQuery.refetch(), 300);
  };

  useEffect(() => {
    if (isSearching) {
      searchAdminsQuery.refetch();
    }
  }, [page]);

  const createNewAdminMutation = useMutation({
    mutationFn: (data: Partial<IAdmin> & { accountId: number }) => {
      return axios.post<IResponseData<IAdmin>>('/personnel/admins', data);
    },
    onError: onError,
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries({ queryKey: ['search-admins'] });
        searchAdminsQuery.refetch();
      } else {
        queryClient.invalidateQueries({ queryKey: ['admins'] });
      }
      toast(getMappedMessage(res.data.message), toastConfig('success'));
    },
  });

  const updateAdminMutation = useMutation({
    mutationFn: ({ adminId, data }: { adminId: number; data: Partial<IAdmin> }) =>
      axios.patch<IResponseData<any>>(`/personnel/admins/${adminId}/update-info`, data),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries({ queryKey: ['search-admins'] });
        searchAdminsQuery.refetch();
      } else {
        queryClient.invalidateQueries({ queryKey: ['admins'] });
      }
      toast(getMappedMessage(res.data.message), toastConfig('success'));
    },
    onError: onError,
  });

  return {
    admins,
    total,
    page,
    limit,
    setPage,
    onFilterSearch,
    onResetFilterSearch,
    buildQuery,
    createNewAdminMutation,
    updateAdminMutation,
  };
};

export default adminService;