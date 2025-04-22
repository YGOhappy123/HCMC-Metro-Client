import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import dayjs from '@/libs/dayjs';

type AdminTableProps = {
  admins: IAdmin[];
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
};

const AdminTable = ({ admins, total, page, limit, setPage}: AdminTableProps) => {
  const columns: ColumnDef<IAdmin>[] = [
    {
      accessorKey: 'adminId',
      header: 'Mã Admin',
    },
    {
      accessorKey: 'fullName',
      header: 'Họ Và Tên',
    },
    {
      accessorKey: 'avatar',
      header: () => <div className="text-center">Ảnh Đại Diện</div>,
      cell: ({ row }) => {
        const avatar = row.original.avatar;
        return (
          <div className="flex justify-center">
            <img src={avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
          </div>
        );
      },
    },
    {
      accessorKey: 'contact',
      header: 'Thông Tin Liên Hệ',
      enableHiding: true,
      cell: ({ row }) => {
        const { email, phoneNumber } = row.original;
        return (
          <div>
            <div>
              <span className="font-semibold">Email: </span>
              {email}
            </div>
            <div>
              <span className="font-semibold">Số Điện Thoại: </span>
              {phoneNumber}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className="text-center">Ngày Tạo Tài Khoản</div>,
      enableHiding: true,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return (
          <div className="flex justify-center">{dayjs(createdAt).format('DD/MM/YYYY')}</div>
        );
      },
    },
  ];

  const lastPage = Math.ceil(total / limit);

  return (
    <div className="flex flex-col gap-8">
      <DataTable columns={columns} data={admins} />
      <div className="join flex w-full justify-center">
        <div className="join">
          <button
            className="join-item btn border-primary cursor-pointer disabled:opacity-70"
            disabled={page === 1}
            onClick={() => setPage(Math.max(page - 1, 1))}
          >
            «
          </button>
          <button className="join-item btn border-primary">
            Trang {page}/{lastPage}
          </button>
          <button
            className="join-item btn border-primary cursor-pointer disabled:opacity-70"
            disabled={page === lastPage}
            onClick={() => setPage(Math.min(page + 1, lastPage))}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;