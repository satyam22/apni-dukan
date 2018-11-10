import { API_BASE_URL } from './config';

export const verifyCard = async (payload, callback) => {
  const { cardHolder, cvv, expiry, cardNumber, cardType } = payload;
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cardHolder, cvv, expiry, cardNumber, cardType })
    });
    const { success, result, message } = await response.json();
    const { otp, id } = result;
    // console.log({ success, otp, id });
    if (success) callback({ otp, success, id })
    else callback(({ success, message }))
  } catch (error) {
    callback({ success: false, message: error.message })
  }
}

export const verifyNetbanking = async (payload, callback) => {
  const { bankName, customerId, password } = payload;
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify/netbanking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bankName, customerId, password })
    });
    const { success, result, message } = await response.json();
    const { otp, id } = result;
    // console.log({ success, otp, id });
    if (success) callback({ otp, success, id })
    else callback(({ success, message }))
  } catch (error) {
    callback({ success: false, message: error.message })
  }
}

export const verifyUpi = async (payload, callback) => {
  const { upiAddress:upiId, upiPin } = payload;
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify/upi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ upiId, upiPin })
    });
    const { success, result, message } = await response.json();
    const { otp, id } = result;
    // console.log({ success, otp, id });
    if (success) callback({ otp, success, id })
    else callback(({ success, message }))
  } catch (error) {
    callback({ success: false, message: error.message })
  }
}

export const verifyOtp = async (payload, callback) => {
  const { otp, amount, transactionId } = payload;
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({otp, amount, transactionId })
    });
    const { success, message } = await response.json();
    callback({ success, message })
  } catch (error) {
    callback({ success: false, message: error.message })
  }
}