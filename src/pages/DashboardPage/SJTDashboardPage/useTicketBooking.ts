import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ticketService from '@/services/ticketService';
import toastConfig from '@/configs/toast';
import { IStation } from '@/types/lines';
import { IPathSegment } from '@/types/lines';
import { PaymentMethod } from '@/types/tickets';

export const useTicketBooking = () => {
  const navigate = useNavigate();
  const { getStations, getPathBetweenStations, createOrder, calculateTotalPrice } = ticketService();

  const { data: stationsData, isLoading, error } = useQuery({
    queryKey: ['stations'],
    queryFn: async () => {
      const response = await getStations();
      console.log('Stations API response:', response);
      return response.data;
    },
    refetchOnWindowFocus: false,
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

  console.log('useTicketBooking state:', { stations, fromStation, toStation });

  useEffect(() => {
    const fetchPath = async () => {
      if (fromStation && toStation && paymentMethod) {
        try {
          const pathRes = await getPathBetweenStations(fromStation, toStation, paymentMethod);
          const pathData = pathRes.data;
          setPath(pathData);
          const total = calculateTotalPrice(pathData, quantity);
          setTotalPrice(total);
        } catch (error) {
          setPath([]);
          setTotalPrice(0);
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
      const response = await createOrder({
        start: fromStation,
        end: toStation,
        quantity,
        paymentMethod,
        path,
      });
      const orderId = response.data?.orderId;
      if (orderId) {
        const fromStationData = stations.find(station => station.stationId === fromStation);
        const toStationData = stations.find(station => station.stationId === toStation);
        const createdAt = new Date().toISOString();
        const expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        setOrderData({
          fromStationName: fromStationData?.stationName || 'Unknown',
          toStationName: toStationData?.stationName || 'Unknown',
          totalPrice,
          createdAt,
          expiredAt,
          orderId,
        });
        setShowTicket(true);
      }
    } catch (error) {
      // Errors handled in ticketService
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
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
      } else if (paymentMethod === 'digitalWallet' && orderData?.orderId) {
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