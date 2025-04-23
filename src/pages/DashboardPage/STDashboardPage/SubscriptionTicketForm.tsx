import { PaymentMethod, ISubscriptionTicket } from '@/types/tickets';
import Button from '@/components/common/Button';

interface SubscriptionTicketFormProps {
  tickets: ISubscriptionTicket[];
  selectedTicket: ISubscriptionTicket | null;
  setSelectedTicket: (ticket: ISubscriptionTicket | null) => void;
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
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full mx-auto border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Đặt vé thời hạn</h2>
      <div className="mb-8">
        <label className="block text-base font-medium text-gray-700 mb-4">Chọn loại vé</label>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className={`flex items-center p-4 rounded-lg border ${
                selectedTicket?.ticketId === ticket.ticketId
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              <input
                type="radio"
                name="subscriptionTicket"
                checked={selectedTicket?.ticketId === ticket.ticketId}
                onChange={() => {
                  console.log('Radio selected:', ticket);
                  setSelectedTicket(ticket);
                }}
                className="mr-3 h-5 w-5 text-primary focus:ring-primary"
                disabled={loading}
              />
              <label className="text-gray-700 text-base flex-1">
                <span className="font-semibold">{ticket.name}</span> - {ticket.price.toLocaleString()} VND (
                {ticket.validityDays} ngày)
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-base font-medium text-gray-700 mb-3">Phương thức thanh toán</label>
        <select
          value={paymentMethod}
          onChange={(e) => {
            const method = e.target.value as PaymentMethod;
            console.log('Select payment method:', method);
            setPaymentMethod(method);
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition"
          disabled={loading}
        >
          <option value="cash">Tiền mặt</option>
          <option value="creditCard">Thẻ tín dụng</option>
          <option value="digitalWallet">Ví điện tử</option>
        </select>
      </div>
      <div className="flex gap-4">
        <Button
          text="Xác nhận"
          className="flex-1 bg-primary text-white rounded-xl px-6 py-3 hover:bg-primary-light transition-colors"
          onClick={() => {
            console.log('Confirm clicked', { selectedTicket, paymentMethod });
            handleConfirm();
          }}
          disabled={loading || !selectedTicket}
        />
        <Button
          text="Hủy"
          className="flex-1 bg-gray-300 text-gray-700 rounded-xl px-6 py-3 hover:bg-gray-400 transition-colors"
          onClick={handleCancel}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default SubscriptionTicketForm;