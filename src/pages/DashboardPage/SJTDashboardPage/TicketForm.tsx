import Button from '@/components/common/Button';
import SelectInput from '@/components/common/SelectInput';
import TextInput from '@/components/common/TextInput';
import { IStation } from '@/types/lines';
import { PaymentMethod } from '@/types/tickets';

interface TicketFormProps {
  stations: IStation[];
  fromStation: number | null;
  setFromStation: (value: number | null) => void;
  toStation: number | null;
  setToStation: (value: number | null) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
  totalPrice: number;
  loading: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const TicketForm = ({
  stations,
  fromStation,
  setFromStation,
  toStation,
  setToStation,
  quantity,
  setQuantity,
  paymentMethod,
  setPaymentMethod,
  totalPrice,
  loading,
  handleConfirm,
  handleCancel,
}: TicketFormProps) => {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full mx-auto border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Bán Vé Xe Bus (Một Chiều)</h1>
      <form>
        <div className="mb-8">
          <SelectInput
            fieldName="fromStation"
            placeholder="Chọn điểm đi"
            options={stations.map((station) => ({
              value: station.stationId,
              label: station.stationName,
            }))}
            error=""
            value={fromStation ?? ''}
            onChange={(value: string | number) => {
              setFromStation(value as number);
              if (value === toStation) setToStation(null);
            }}
            onFocus={() => {}}
            labelClassName="bg-white text-base font-medium text-gray-700 mb-3"
            selectClassName="py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="mb-8">
          <SelectInput
            fieldName="toStation"
            placeholder="Chọn điểm đến"
            options={stations
              .filter((station) => station.stationId !== fromStation)
              .map((station) => ({
                value: station.stationId,
                label: station.stationName,
              }))}
            error=""
            value={toStation ?? ''}
            onChange={(value: string | number) => setToStation(value as number)}
            onFocus={() => {}}
            labelClassName="bg-white text-base font-medium text-gray-700 mb-3"
            selectClassName="py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="mb-8">
          <SelectInput
            fieldName="paymentMethod"
            placeholder="Chọn phương thức thanh toán"
            options={[
              { value: 'cash', label: 'Tiền mặt' },
              { value: 'vnpay', label: 'VNPay' },
            ]}
            error=""
            value={paymentMethod}
            onChange={(value: string | number) => setPaymentMethod(value as PaymentMethod)}
            onFocus={() => {}}
            labelClassName="bg-white text-base font-medium text-gray-700 mb-3"
            selectClassName="py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="mb-8">
          <TextInput
            fieldName="quantity"
            placeholder="Số lượng vé"
            type="number"
            error=""
            value={quantity.toString()}
            onChange={(value: string) => setQuantity(parseInt(value) || 1)}
            onFocus={() => {}}
            labelClassName="bg-white text-base font-medium text-gray-700 mb-3"
            inputClassName="py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          />
        </div>
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-800">
            Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            text="Xác nhận"
            className="flex-1 bg-primary text-white rounded-xl px-6 py-3 hover:bg-primary-light transition-colors"
            onClick={handleConfirm}
            disabled={loading || !fromStation || !toStation}
          />
          <Button
            text="Hủy"
            className="flex-1 bg-gray-300 text-gray-700 rounded-xl px-6 py-3 hover:bg-gray-400 transition-colors"
            onClick={handleCancel}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;