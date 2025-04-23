import useCreateSubscriptionTicket from './useCreateSubscriptionTicket';
import SubscriptionTicketForm from './SubscriptionTicketForm';
import SubscriptionTicketDetails from './SubscriptionTicketDetails';

const STDashboardPage = () => {
  const {
    subscriptionTickets,
    selectedTicket,
    handleSelectTicket,
    paymentMethod,
    handleSelectPaymentMethod,
    ticketDetails,
    isLoading,
    handleConfirm,
    handlePayment,
    handleCancel,
  } = useCreateSubscriptionTicket();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SubscriptionTicketForm
        tickets={subscriptionTickets}
        selectedTicket={selectedTicket}
        setSelectedTicket={handleSelectTicket}
        paymentMethod={paymentMethod}
        setPaymentMethod={handleSelectPaymentMethod}
        loading={isLoading}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      {ticketDetails && (
        <SubscriptionTicketDetails
          ticketDetails={ticketDetails}
          handlePayment={handlePayment}
          handleCancel={handleCancel}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default STDashboardPage;