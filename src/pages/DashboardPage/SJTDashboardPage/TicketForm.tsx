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
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Bán Vé Xe Bus (Một Chiều)</h1>
      <form>
        <div className="mb-4">
          <SelectInput
            fieldName="fromStation"
            placeholder="Chọn điểm đi"
            options={stations.map(station => ({
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
            labelClassName="bg-white"
            selectClassName="py-[9px] block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <SelectInput
            fieldName="toStation"
            placeholder="Chọn điểm đến"
            options={stations
              .filter(station => station.stationId !== fromStation)
              .map(station => ({
                value: station.stationId,
                label: station.stationName,
              }))}
            error=""
            value={toStation ?? ''}
            onChange={(value: string | number) => setToStation(value as number)}
            onFocus={() => {}}
            labelClassName="bg-white"
            selectClassName="py-[9px] block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
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
            labelClassName="bg-white"
            selectClassName="py-[9px] block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <TextInput
            fieldName="quantity"
            placeholder="Số lượng vé"
            type="number"
            error=""
            value={quantity.toString()}
            onChange={(value: string) => setQuantity(parseInt(value) || 1)}
            onFocus={() => {}}
            labelClassName="bg-white"
            inputClassName="leading-2"
          />
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND
          </p>
        </div>
        <div className="flex justify-between">
          <Button
            text="Xác nhận"
            variant="gradient"
            className="border-primary rounded-2xl px-4 py-2"
            onClick={handleConfirm}
            disabled={loading || !fromStation || !toStation}
          />
          <Button
            text="Hủy"
            variant="danger"
            className="rounded-2xl px-4 py-2"
            onClick={handleCancel}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;