import React from 'react';

const PaymentDemo = () => {
  const handlePayment = () => {
    if (!window?.Pi?.createPayment) {
      alert("Pi SDK is not loaded or window.Pi is undefined");
      return;
    }

    window.Pi.createPayment(
      {
        amount: 0.01,
        memo: "Access to TektonNet feature",
        metadata: { type: "TektonNet Subscription" },
      },
      {
        onReadyForServerApproval: (paymentId) => {
          console.log("Ready for server approval: ", paymentId);
        },
        onReadyForServerCompletion: (paymentId) => {
          console.log("Ready for server completion: ", paymentId);
        },
        onCancel: (error) => {
          console.error("Payment canceled:", error);
        },
        onError: (error) => {
          console.error("Payment failed:", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-purple-100 text-center px-4">
      <h1 className="text-3xl font-bold mb-4">🔐 Pay 0.01 Pi to TektonNet</h1>
      <p className="mb-6 text-gray-600">
        Unlock premium AI-powered consultation and tools.
      </p>
      <button
        onClick={handlePayment}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition-all"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentDemo;
