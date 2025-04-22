import Button from '@/components/common/Button';
import { PaymentMethod } from '@/types/tickets';

interface TicketDetails {
  ticketName: string;
  price: number;
  purchaseDate: string;
  expiredAt: string;
  paymentMethod: PaymentMethod;
}

interface SubscriptionTicketDetailsProps {
  ticketDetails: TicketDetails;
  handlePayment: () => void;
  loading: boolean;
}

const SubscriptionTicketDetails = ({ ticketDetails, handlePayment, loading }: SubscriptionTicketDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Chi tiết vé</h2>
      <div className="mb-2">
        <span className="font-semibold">Loại vé: </span>
        {ticketDetails.ticketName}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Giá tiền: </span>
        {ticketDetails.price.toLocaleString()} VND
      </div>
      <div className="mb-2">
        <span className="font-semibold">Ngày bắt đầu: </span>
        {new Date(ticketDetails.purchaseDate).toLocaleDateString('vi-VN')}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Ngày hết hạn: </span>
        {new Date(ticketDetails.expiredAt).toLocaleDateString('vi-VN')}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Phương thức thanh toán: </span>
        {ticketDetails.paymentMethod === 'cash' ? 'Tiền mặt' :
         ticketDetails.paymentMethod === 'creditCard' ? 'Thẻ tín dụng' :
         ticketDetails.paymentMethod === 'digitalWallet' ? 'Ví điện tử' : 'Thẻ SFC'}
      </div>
      <Button
        text="Thanh toán"
        variant="gradient"
        className="border-primary rounded-2xl px-4 py-2 w-full"
        onClick={handlePayment}
        disabled={loading}
      />
    </div>
  );
};

export default SubscriptionTicketDetails;