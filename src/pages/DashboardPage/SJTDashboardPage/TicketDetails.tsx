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
  handleCancel: () => void; // Thêm prop để hủy
  loading: boolean;
}

const TicketDetails = ({ orderData, handlePayment, handleCancel, loading }: TicketDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform scale-100 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Chi tiết vé xe bus</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Ga đi:</span>
            <span className="text-gray-900">{orderData.fromStationName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Ga đến:</span>
            <span className="text-gray-900">{orderData.toStationName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Tổng tiền:</span>
            <span className="text-gray-900">{orderData.totalPrice.toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Ngày mua:</span>
            <span className="text-gray-900">{new Date(orderData.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Hạn sử dụng:</span>
            <span className="text-gray-900">{new Date(orderData.expiredAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button
            text="Thanh toán"
            className="flex-1 bg-primary text-white rounded-xl px-6 py-3 hover:bg-primary-light transition-colors"
            onClick={handlePayment}
            disabled={loading}
          />
          <Button
            text="Trở lại"
            className="flex-1 bg-gray-300 text-gray-700 rounded-xl px-6 py-3 hover:bg-gray-400 transition-colors"
            onClick={() => {
              console.log('Cancel clicked from modal');
              handleCancel();
            }}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;