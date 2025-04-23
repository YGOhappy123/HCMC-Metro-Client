import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ticketService from '@/services/ticketService';
import toastConfig from '@/configs/toast';
import useAxiosIns from '@/hooks/useAxiosIns';
import { IStation, IPathSegment } from '@/types/lines';
import { PaymentMethod } from '@/types/tickets';

export const useTicketBooking = () => {
  const navigate = useNavigate();
  const axios = useAxiosIns();

  // Memoize ticketService để tránh tạo instance mới mỗi render
  const service = useMemo(() => ticketService(axios), [axios]);
  const { getStations, getPathBetweenStations, createOrder, calculateTotalPrice } = service;

  const { data: stationsData, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: async () => {
      console.log('Fetching stations...');
      const response = await getStations();
      console.log('Stations API response:', response);
      if (!response.data || response.data.length === 0) {
        throw new Error('Danh sách ga rỗng');
      }
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: 3, // Thử lại 3 lần nếu lỗi
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Delay tăng dần
  });

  const stations: IStation[] = stationsData || [];

  const [fromStation, setFromStation] = useState<number | null>(null);
  const [toStation, setToStation] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [path, setPath] = useState<IPathSegment[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTicket, setShowTicket] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<{
    fromStationName: string;
    toStationName: string;
    totalPrice: number;
    createdAt: string;
    expiredAt: string;
    orderId?: number;
  } | null>(null);

  console.log('useTicketBooking state:', { stations, fromStation, toStation, quantity, paymentMethod, path, totalPrice });

  useEffect(() => {
    const fetchPath = async () => {
      if (fromStation && toStation && paymentMethod && fromStation !== toStation) {
        console.count('fetchPath called');
        try {
          console.log('Fetching path for:', { fromStation, toStation, paymentMethod });
          const pathRes = await getPathBetweenStations(fromStation, toStation, paymentMethod);
          const pathData = pathRes.data;
          console.log('Path response:', pathData);
          setPath(pathData);
          const total = calculateTotalPrice(pathData, quantity);
          setTotalPrice(total);
        } catch (error) {
          console.error('Error fetching path:', error);
          setPath([]);
          setTotalPrice(0);
          toast('Lỗi khi lấy đường đi hoặc giá vé', toastConfig('error'));
        }
      } else {
        setPath([]);
        setTotalPrice(0);
      }
    };
    fetchPath();
  }, [fromStation, toStation, paymentMethod, quantity, getPathBetweenStations, calculateTotalPrice]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (!fromStation || !toStation) {
        toast('Vui lòng chọn điểm đi và điểm đến', toastConfig('error'));
        return;
      }
      if (fromStation === toStation) {
        toast('Điểm đi và điểm đến không được trùng', toastConfig('error'));
        return;
      }
      if (quantity < 1) {
        toast('Số lượng vé phải lớn hơn hoặc bằng 1', toastConfig('error'));
        return;
      }
      console.log('Creating order:', { fromStation, toStation, quantity, paymentMethod, path });
      const response = await createOrder({
        start: fromStation,
        end: toStation,
        quantity,
        paymentMethod,
        path,
      });
      const orderId = response.data?.orderId;
      if (orderId) {
        const fromStationData = stations.find((station) => station.stationId === fromStation);
        const toStationData = stations.find((station) => station.stationId === toStation);
        const createdAt = new Date().toISOString();
        const expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        const order = {
          fromStationName: fromStationData?.stationName || 'Unknown',
          toStationName: toStationData?.stationName || 'Unknown',
          totalPrice,
          createdAt,
          expiredAt,
          orderId,
        };
        console.log('Order data:', order);
        setOrderData(order);
        setShowTicket(true);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (!orderData) {
        toast('Không có thông tin đơn hàng', toastConfig('error'));
        return;
      }
      console.log('Processing payment:', { paymentMethod, orderId: orderData.orderId });
      if (paymentMethod === 'cash') {
        toast('Thanh toán thành công', toastConfig('success'));
        setFromStation(null);
        setToStation(null);
        setQuantity(1);
        setPaymentMethod('cash');
        setPath([]);
        setTotalPrice(0);
        setShowTicket(false);
        setOrderData(null);
      } else if (paymentMethod === 'digitalWallet' && orderData.orderId) {
        navigate(`/payment/${orderData.orderId}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast('Lỗi khi xử lý thanh toán', toastConfig('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Giao dịch chưa hoàn thành. Bạn có muốn hủy?');
    if (confirmCancel) {
      console.log('Canceling transaction');
      setFromStation(null);
      setToStation(null);
      setQuantity(1);
      setPaymentMethod('cash');
      setPath([]);
      setTotalPrice(0);
      setShowTicket(false);
      setOrderData(null);
      toast('Đã hủy giao dịch', toastConfig('info'));
    }
  };

  return {
    stations,
    isLoading,
    error,
    fromStation,
    setFromStation,
    toStation,
    setToStation,
    quantity,
    setQuantity,
    paymentMethod,
    setPaymentMethod,
    totalPrice,
    showTicket,
    orderData,
    loading,
    handleConfirm,
    handlePayment,
    handleCancel,
  };
};