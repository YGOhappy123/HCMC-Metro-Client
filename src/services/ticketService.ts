import useAxiosIns from '@/hooks/useAxiosIns';
import { toast } from 'react-toastify';
import toastConfig from '@/configs/toast';
import { ISubscriptionTicketPrice, IIssuedSubscriptionTicket } from '@/types/tickets';

const ticketService = () => {
  const axios = useAxiosIns();

  const getStations = async () => {
    try {
      const response = await axios.get<IResponseData<IStation[]>>('/stations/metro-stations');
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      toast('Lỗi khi lấy danh sách ga', toastConfig('error'));
      throw error;
    }
  };

  const getPathBetweenStations = async (startStationId: number, endStationId: number, paymentMethod: PaymentMethod) => {
    try {
      const response = await axios.get<IResponseData<IPathSegment[]>>(
        `/stations/metro-path?startStationId=${startStationId}&endStationId=${endStationId}&paymentMethod=${paymentMethod}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching path:', error);
      toast('Lỗi khi lấy đường đi hoặc giá vé', toastConfig('error'));
      throw error;
    }
  };

  const issueSubscriptionTicket = async (data: {
    subscriptionTicketId: number;
    price: number;
    purchaseDate: string;
    expiredAt: string;
    paymentMethod: PaymentMethod;
    issuedStationId: number;
  }) => {
    try {
      const response = await axios.post<IResponseData<IIssuedSubscriptionTicket>>('/ticket/issue-subscription-ticket', {
        ...data,
        code: `SUB-${Date.now()}`, // Tạo mã vé đơn giản
        paymentTime: new Date().toISOString(),
      });
      console.log('issueSubscriptionTicket response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error issuing subscription ticket:', error);
      toast('Lỗi khi lưu vé thời hạn', toastConfig('error'));
      throw error;
    }
  };

  const getSubscriptionTickets = async () => {
    try {
      const response = await axios.get<IResponseData<ISubscriptionTicketPrice[]>>('/ticket/subscription-tickets', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      console.log('getSubscriptionTickets response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription tickets:', error);
      toast('Lỗi khi lấy danh sách vé thời hạn', toastConfig('error'));
      throw error;
    }
  };


  const createOrder = async (data: {
    start: number;
    end: number;
    quantity: number;
    paymentMethod: PaymentMethod;
    path: IPathSegment[];
  }) => {
    try {
      if (data.start === data.end) {
        toast('Điểm đi và điểm đến không được trùng', toastConfig('error'));
        throw new Error('Invalid stations');
      }
      if (data.quantity < 1) {
        toast('Số lượng vé phải lớn hơn hoặc bằng 1', toastConfig('error'));
        throw new Error('Invalid quantity');
      }
      
      const response = await axios.post<IResponseData<{ orderId: number }>>('/ticket/orders', data);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      toast('Lỗi khi tạo đơn hàng', toastConfig('error'));
      throw error;
    }
  };

  const verifyPayment = async (vnp_TxnRef: number, vnp_ResponseCode: string, paymentMethod: PaymentMethod) => {
    try {
      const response = await axios.get<IResponseData<{ orderId: number }>>(
        `/ticket/verify-payment?vnp_TxnRef=${vnp_TxnRef}&vnp_ResponseCode=${vnp_ResponseCode}&paymentMethod=${paymentMethod}`
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast('Lỗi khi xác nhận thanh toán', toastConfig('error'));
      throw error;
    }
  };

  const calculateTotalPrice = (path: IPathSegment[], quantity: number) => {
    const total = path.reduce((sum, segment) => sum + segment.price, 0) * quantity;
    return total;
  };

  return {
    getStations,
    getPathBetweenStations,
    createOrder,
    verifyPayment,
    calculateTotalPrice,
    issueSubscriptionTicket,
    getSubscriptionTickets
  };
};

export default ticketService;