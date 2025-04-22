import Button from '@/components/common/Button';

interface OrderData {
  fromStationName: string;
  toStationName: string;
  totalPrice: number;
  createdAt: string;
  expiredAt: string;
  orderId?: number;
}

interface TicketDetailsProps {
  orderData: OrderData;
  handlePayment: () => void;
  loading: boolean;
}

const TicketDetails = ({ orderData, handlePayment, loading }: TicketDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Vé Xe Bus</h2>
      <div className="bg-gray-100 p-4 rounded-lg w-full text-center">
        <p className="mb-2"><strong>Ga đi:</strong> {orderData.fromStationName}</p>
        <p className="mb-2"><strong>Ga đến:</strong> {orderData.toStationName}</p>
        <p className="mb-2"><strong>Tổng tiền:</strong> {orderData.totalPrice.toLocaleString('vi-VN')} VND</p>
        <p className="mb-2"><strong>Ngày mua:</strong> {new Date(orderData.createdAt).toLocaleString('vi-VN')}</p>
        <p className="mb-4"><strong>Hạn sử dụng:</strong> {new Date(orderData.expiredAt).toLocaleString('vi-VN')}</p>
      </div>
      <Button
        text="Thanh toán"
        variant="gradient"
        className="mt-4 border-primary rounded-2xl px-4 py-2"
        onClick={handlePayment}
        disabled={loading}
      />
    </div>
  );
};

export default TicketDetails;