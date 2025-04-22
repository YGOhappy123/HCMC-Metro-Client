import { useTicketBooking } from './useTicketBooking';
import TicketForm from './TicketForm';
import TicketDetails from './TicketDetails';

const SJTDashboardPage = () => {
  const {
    stations,
    isLoading,
    error,
    fromStation,
    setFromStation,
    toStation,
    setToStation,
    quantity,
    setQuantity,
    paymentMethod,
    setPaymentMethod,
    totalPrice,
    showTicket,
    orderData,
    loading,
    handleConfirm,
    handlePayment,
    handleCancel,
  } = useTicketBooking();

  if (isLoading) {
    return <div>Đang tải danh sách ga...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải danh sách ga: {error.message}</div>;
  }

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-6">
      <TicketForm
        stations={stations}
        fromStation={fromStation}
        setFromStation={setFromStation}
        toStation={toStation}
        setToStation={setToStation}
        quantity={quantity}
        setQuantity={setQuantity}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        totalPrice={totalPrice}
        loading={loading}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      {showTicket && orderData && (
        <TicketDetails orderData={orderData} handlePayment={handlePayment} loading={loading} />
      )}
    </div>
  );
};

export default SJTDashboardPage;