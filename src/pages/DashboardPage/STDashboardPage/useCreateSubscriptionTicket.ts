import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import ticketService from '@/services/ticketService';
import toastConfig from '@/configs/toast';
import { PaymentMethod } from '@/types/tickets';
import { ISubscriptionTicketPrice } from '@/types/tickets';

export const useCreateSubscriptionTicket = () => {
  const { getSubscriptionTickets, issueSubscriptionTicket } = ticketService();

  const { data: ticketsData, isLoading, error } = useQuery({
    queryKey: ['subscriptionTickets'],
    queryFn: async () => {
      const response = await getSubscriptionTickets();
      console.log('Subscription tickets API response:', response);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const tickets: ISubscriptionTicketPrice[] = ticketsData || [];

  const [selectedTicket, setSelectedTicket] = useState<ISubscriptionTicketPrice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [ticketDetails, setTicketDetails] = useState<{
    ticketName: string;
    price: number;
    purchaseDate: string;
    expiredAt: string;
    paymentMethod: PaymentMethod;
    subscriptionTicketId: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = () => {
    if (!selectedTicket || !selectedTicket.subscriptionTicket) {
      toast('Vui lòng chọn loại vé hợp lệ', toastConfig('error'));
      return;
    }

    const purchaseDate = new Date().toISOString();
    const expiredAt = new Date(
      Date.now() + selectedTicket.subscriptionTicket.validityDays * 24 * 60 * 60 * 1000
    ).toISOString();

    setTicketDetails({
      ticketName: selectedTicket.subscriptionTicket.name,
      price: selectedTicket.price,
      purchaseDate,
      expiredAt,
      paymentMethod,
      subscriptionTicketId: selectedTicket.subscriptionTicketId,
    });
  };

  const handlePayment = async () => {
    if (!ticketDetails) {
      toast('Không có thông tin vé để thanh toán', toastConfig('error'));
      return;
    }

    setLoading(true);
    try {
      await issueSubscriptionTicket({
        subscriptionTicketId: ticketDetails.subscriptionTicketId,
        price: ticketDetails.price,
        purchaseDate: ticketDetails.purchaseDate,
        expiredAt: ticketDetails.expiredAt,
        paymentMethod: ticketDetails.paymentMethod,
        issuedStationId: 1, // Giả định ga phát hành
      });
      toast('Vé đã được lưu thành công', toastConfig('success'));
      setSelectedTicket(null);
      setPaymentMethod('cash');
      setTicketDetails(null);
    } catch (error) {
      console.error('Error issuing subscription ticket:', error);
      toast('Lỗi khi lưu vé thời hạn', toastConfig('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Giao dịch chưa hoàn thành. Bạn có muốn hủy?');
    if (confirmCancel) {
      setSelectedTicket(null);
      setPaymentMethod('cash');
      setTicketDetails(null);
      toast('Đã hủy giao dịch', toastConfig('info'));
    }
  };

  return {
    tickets,
    isLoading,
    error,
    selectedTicket,
    setSelectedTicket,
    paymentMethod,
    setPaymentMethod,
    ticketDetails,
    loading,
    handleConfirm,
    handlePayment,
    handleCancel,
  };
};