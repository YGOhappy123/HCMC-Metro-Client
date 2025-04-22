import { useCreateSubscriptionTicket } from './useCreateSubscriptionTicket';
import SubscriptionTicketForm from './SubscriptionTicketForm';
import SubscriptionTicketDetails from './SubscriptionTicketDetails';

const STDashboardPage = () => {
  const {
    tickets,
    isLoading,
    error,
    selectedTicket,
    setSelectedTicket,
    paymentMethod,
    setPaymentMethod,
    ticketDetails,
    loading,
    handleConfirm,
    handlePayment,
    handleCancel,
  } = useCreateSubscriptionTicket();

  if (isLoading) {
    return <div>Đang tải danh sách vé...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải danh sách vé: {error.message}</div>;
  }

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-6">
      <SubscriptionTicketForm
        tickets={tickets}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        loading={loading}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      {ticketDetails && (
        <SubscriptionTicketDetails
          ticketDetails={ticketDetails}
          handlePayment={handlePayment}
          loading={loading}
        />
      )}
    </div>
  );
};

export default STDashboardPage;