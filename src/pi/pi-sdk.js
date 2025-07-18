import { Pi } from '@pinetwork-js/sdk';

const initPi = () => {
  Pi.init({
    version: "2.0",
    sandbox: true // Chuyển sang false nếu production
  });
};

const authenticate = async () => {
  try {
    const scopes = ['username', 'payments'];
    const user = await Pi.authenticate(scopes, onIncompletePaymentFound);
    return user;
  } catch (error) {
    console.error('Pi authentication failed:', error);
    return null;
  }
};

function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}

export { initPi, authenticate };
