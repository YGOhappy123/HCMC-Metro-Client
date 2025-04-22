import { PaymentMethod } from '@/types/tickets';
import Button from '@/components/common/Button';
import { ISubscriptionTicketPrice } from '@/types/tickets';

interface SubscriptionTicketFormProps {
  tickets: ISubscriptionTicketPrice[];
  selectedTicket: ISubscriptionTicketPrice | null;
  setSelectedTicket: (ticket: ISubscriptionTicketPrice | null) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  loading: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const SubscriptionTicketForm = ({
  tickets,
  selectedTicket,
  setSelectedTicket,
  paymentMethod,
  setPaymentMethod,
  loading,
  handleConfirm,
  handleCancel,
}: SubscriptionTicketFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Đặt vé thời hạn</h2>
      {tickets.length === 0 ? (
        <div className="text-gray-600 mb-4">Không có vé nào để hiển thị</div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Chọn loại vé</label>
          {tickets.map((ticket) => (
            <div key={ticket.priceId} className="flex items-center mb-2">
              <input
                type="radio"
                name="subscriptionTicket"
                checked={selectedTicket?.priceId === ticket.priceId}
                onChange={() => setSelectedTicket(ticket)}
                className="mr-2"
                disabled={loading}
              />
              <label className="text-gray-700">
                {ticket.subscriptionTicket?.name || 'Không xác định'} - {ticket.price.toLocaleString()} VND (
                {ticket.subscriptionTicket?.validityDays || 0} ngày)
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Phương thức thanh toán</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
          className="w-full border rounded-lg px-3 py-2"
          disabled={loading}
        >
          <option value="cash">Tiền mặt</option>
          <option value="creditCard">Thẻ tín dụng</option>
          <option value="digitalWallet">Ví điện tử</option>
          <option value="sfc">Thẻ SFC</option>
        </select>
      </div>
      <div className="flex gap-4">
        <Button
          text="Xác nhận"
          variant="gradient"
          className="border-primary rounded-2xl px-4 py-2 flex-1"
          onClick={handleConfirm}
          disabled={loading || !selectedTicket}
        />
        <Button
          text="Hủy"
          variant="gradient"
          className="border-primary rounded-2xl px-4 py-2 flex-1"
          onClick={handleCancel}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default SubscriptionTicketForm;