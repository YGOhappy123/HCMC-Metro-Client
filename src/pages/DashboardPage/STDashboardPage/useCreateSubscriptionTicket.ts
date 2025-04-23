import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import toastConfig from '@/configs/toast';
import ticketService from '@/services/ticketService';
import useAxiosIns from '@/hooks/useAxiosIns';
import { PaymentMethod, ISubscriptionTicket, IIssuedSubscriptionTicket } from '@/types/tickets';
import { addDays } from 'date-fns';

const validTicketStatuses = ['UNPAID', 'PAID', 'USED', 'EXPIRED'] as const;
type TicketStatus = typeof validTicketStatuses[number];

const useCreateSubscriptionTicket = () => {
  const axios = useAxiosIns();
  const service = ticketService(axios);

  const [selectedTicket, setSelectedTicket] = useState<ISubscriptionTicket | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [ticketDetails, setTicketDetails] = useState<IIssuedSubscriptionTicket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionTickets: ISubscriptionTicket[] = useMemo(
    () => [
      { ticketId: 1, name: 'Vé 1 ngày', validityDays: 1, requirements: '', price: 30000 },
      { ticketId: 2, name: 'Vé 3 ngày', validityDays: 3, requirements: '', price: 90000 },
      { ticketId: 3, name: 'Vé 30 ngày', validityDays: 30, requirements: '', price: 300000 },
      { ticketId: 4, name: 'Vé 30 ngày HSSV', validityDays: 30, requirements: '', price: 150000 },
    ],
    []
  );

  const handleSelectTicket = (ticket: ISubscriptionTicket | null) => {
    console.log('Selected ticket:', ticket);
    setSelectedTicket(ticket);
  };

  const handleSelectPaymentMethod = useCallback((method: PaymentMethod) => {
    console.log('Selected payment method:', method);
    setPaymentMethod(method);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedTicket) {
      toast('Vui lòng chọn loại vé', toastConfig('error'));
      return;
    }
    if (!paymentMethod) {
      toast('Vui lòng chọn phương thức thanh toán', toastConfig('error'));
      return;
    }

    const purchaseDate = new Date();
    const expiredAt = addDays(purchaseDate, selectedTicket.validityDays);

    const ticket: IIssuedSubscriptionTicket = {
      ticketId: 0,
      code: `SUB-${Date.now()}`,
      subscriptionTicketId: selectedTicket.ticketId,
      price: selectedTicket.price,
      purchaseDate: purchaseDate.toISOString(),
      expiredAt: expiredAt.toISOString(),
      issuedStationId: 1,
      orderId: 0,
      status: 'UNPAID',
      paymentMethod,
      ticketName: selectedTicket.name,
    };

    console.log('Created ticket details:', ticket);
    setTicketDetails(ticket);
  }, [selectedTicket, paymentMethod]);

  const handlePayment = useCallback(async () => {
    if (!ticketDetails || !paymentMethod) {
      toast('Không có thông tin vé để thanh toán', toastConfig('error'));
      return;
    }

    setIsLoading(true);
    try {
      const paymentTime = new Date().toISOString();
      const orderResponse = await service.createOrderSubscription({
        paymentMethod,
        paymentTime,
        totalAmount: ticketDetails.price,
      });
      const orderId = orderResponse.data.orderId;

      await service.issueSubscriptionTicket({
        subscriptionTicketId: ticketDetails.subscriptionTicketId,
        price: ticketDetails.price,
        issuedAt: ticketDetails.purchaseDate,
        expiredAt: ticketDetails.expiredAt,
        issuedStationId: ticketDetails.issuedStationId,
        code: ticketDetails.code,
        orderId,
      });

      toast('Vé đã được lưu thành công', toastConfig('success'));
      setSelectedTicket(null);
      setPaymentMethod('cash');
      setTicketDetails(null);
    } catch (error) {
      console.error('Error issuing subscription ticket:', error);
      toast('Lỗi khi lưu vé thời hạn', toastConfig('error'));
    } finally {
      setIsLoading(false);
    }
  }, [ticketDetails, paymentMethod, service]);

  const handleCancel = useCallback(() => {
    if (window.confirm('Giao dịch chưa hoàn thành. Bạn có muốn hủy?')) {
      setSelectedTicket(null);
      setPaymentMethod('cash');
      setTicketDetails(null);
      toast('Đã hủy giao dịch', toastConfig('info'));
    }
  }, []);

  return {
    subscriptionTickets,
    selectedTicket,
    paymentMethod,
    ticketDetails,
    isLoading,
    handleSelectTicket,
    handleSelectPaymentMethod,
    handleConfirm,
    handlePayment,
    handleCancel,
  };
};

export default useCreateSubscriptionTicket;
