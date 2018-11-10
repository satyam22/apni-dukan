import pool from './../db/pool';

const verifyCard = async (req, res) => {
  const { expiry, cvv, cardHolder, cardNumber, cardType } = req.body;
  if (!expiry || !cvv || !cardHolder || !cardNumber || !cardType)
    return res.status(400).json({
      message: "card number, card holder name, card type, expiry, cvv is required to verify a card"
    });
  const SELECT_CARD_QUERY = `select * from cardDetails where number="${cardNumber}" and name="${cardHolder}" and cvv="${cvv}" and exp="${expiry}" and issuingNetwork="${cardType}"`;
  console.log({ SELECT_CARD_QUERY });
  try {
    const result = await pool.query(SELECT_CARD_QUERY, [cardNumber, cardHolder, cvv, expiry, cardType]);
    console.log({ result });
    if (!result || result.length === 0)
      res.status(403).json({ success: false, message: "Incorrect card details" });
    const transactionResult = await createTransaction('card', cardNumber);
    res.status(200).json({ success: true, result: transactionResult })
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const verifyNetbanking = async (req, res) => {
  const { bankName, customerId, password } = req.body;
  if (!bankName || !customerId || !password)
    return res.status(400).json({
      message: "Bank name, customer Id and password is required for authorization"
    });
  const SELECT_NETBANK_QUERY = `select * from netbankingDetails where customerId="${customerId}" and bankName="${bankName}" and password="${password}"`;
  console.log({ SELECT_NETBANK_QUERY });
  try {
    const result = await pool.query(SELECT_NETBANK_QUERY, [customerId, bankName, password]);
    console.log({ result });
    if (!result || result.length === 0)
      res.status(403).json({ success: false, message: "Incorrect login details" });
    const transactionResult = await createTransaction('netbanking', customerId);
    res.status(200).json({ success: true, result: transactionResult })
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const verifyUpi = async (req, res) => {
  const { upiId, upiPin } = req.body;
  if (!upiId || !upiPin)
    return res.status(400).json({
      message: "UPI ID and UPI PIN is required for authorization"
    });
  const SELECT_UPI_QUERY = `select * from upiDetails where upiId = "${upiId}" and upiPin = "${upiPin}"`;
  console.log({ SELECT_UPI_QUERY });
  try {
    const result = await pool.query(SELECT_UPI_QUERY, [upiId, upiPin]);
    console.log({ result });
    if (!result || result.length === 0)
      res.status(403).json({ success: false, message: "Incorrect login details" });
    const transactionResult = await createTransaction('upi', upiId);
    res.status(200).json({ success: true, result: transactionResult })
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const verifyOtp = async (req, res) => {
  let { amount, transactionId, otp } = req.body;
  if (!amount || !transactionId || !otp)
    return res.status(400).body({
      success: false,
      message: 'Transaction Id, amount and otp is required to verify transaction'
    });
  otp = Number(otp);
  amount = Number(amount);

  const SELECT_TRANSACTION_QUERY = `select * from transactions where id=${transactionId}`;
  try {
    const result = await pool.query(SELECT_TRANSACTION_QUERY);
    if (!result || result.length === 0)
      return res.status(403).json({
        success: false,
        message: 'Transaction with specified id does not exist'
      })
    if(result[0].status !== 'pending')
    return res.status(403).json({
      success: false,
      message: 'Errror. Transaction is not in pending state. its either already completed or failed'
    });
    if (result[0].otp !== otp) {
      return res.status(403).json({
        success: false,
        message: 'Transaction failed. Otp does not match'
      });
    }
    const currentTimestamp = (new Date()).getTime();
    if (result[0].otpExpiresIn < currentTimestamp) {
      return res.status(403).json({
        success: false,
        message: 'Transaction failed. Otp expired.'
      });
    }
    const { transactionType, refId } = result[0];
    if (transactionType === 'card') {
      const SELECT_CARD_QUERY = `select balance from cardDetails where number= "${refId}"`;
      const cardResp = await pool.query(SELECT_CARD_QUERY);
      if (!cardResp || cardResp.length === 0) {
        await updateTransactionStatus(transactionId, 'failed')
        return res.status(403).json({
          success: false,
          message: 'Transaction failed. Card details not matched'
        })
      }
      if (!cardResp[0].balance || cardResp[0].balance < amount) {
        await updateTransactionStatus(transactionId, 'failed')
        return res.status(403).json({
          success: false,
          message: 'Transaction failed. You do not have enough credit balance to complete this transaction'
        })
      }
      const updatedBalance = cardResp[0].balance - amount;
      const UPDATE_BALANCE_QUERY = `update cardDetails set balance = ${updatedBalance} where number="${refId}"`;
      const updateBalanceResult = await pool.query(UPDATE_BALANCE_QUERY);
      await updateTransactionStatus(transactionId, 'successful');
      return res.status(200).json({ success: true, message: 'Transaction completed successfully' });
    }
    if (transactionType === 'netbanking') {
      const SELECT_NETBANK_QUERY = `select balance from netbankingDetails where customerId= "${refId}"`;
      const netBankResp = await pool.query(SELECT_NETBANK_QUERY);
      if (!netBankResp || netBankResp.length === 0) {
        await updateTransactionStatus(transactionId, 'failed')
        return res.status(403).json({
          success: false,
          message: 'Transaction failed. Banking details not matched'
        })
      }
      if (!netBankResp[0].balance || netBankResp[0].balance < amount) {
        await updateTransactionStatus(transactionId, 'failed');
        return res.status(403).json({
          success: false,
          message: 'Transaction failed. You do not have enough credit balance to complete this transaction'
        })
      }
      const updatedBalance = netBankResp[0].balance - amount;
      const UPDATE_BALANCE_QUERY = `update netbankingDetails set balance = ${updatedBalance} where customerId="${refId}"`;
      const updateBalanceResult = await pool.query(UPDATE_BALANCE_QUERY);
      await updateTransactionStatus(transactionId, 'successful');
      return res.status(200).json({ success: true, message: 'Transaction completed successfully' });
    }
    if (transactionType === 'upi') {
      const SELECT_UPI_QUERY = `select balance from upiDetails where upiId= "${refId}"`;
      const upiResp = await pool.query(SELECT_UPI_QUERY);
      if (!upiResp || upiResp.length === 0) {
        await updateTransactionStatus(transactionId, 'failed');
        return res.status(403).json({
          success: false,
          message: 'Transaction failed. UPI details not matched'
        })
      }
      if (!upiResp[0].balance || upiResp[0].balance < amount) {
        await updateTransactionStatus(transactionId, 'failed');
        return res.status(403).json({
          success: false,
          message: 'Transaction failed. You do not have enough credit balance to complete this transaction'
        })
      }
      const updatedBalance = upiResp[0].balance - amount;
      const UPDATE_BALANCE_QUERY = `update upiDetails set balance = ${updatedBalance} where upiId="${refId}"`;
      const updateBalanceResult = await pool.query(UPDATE_BALANCE_QUERY);
      await updateTransactionStatus(transactionId, 'successful');
      return res.status(200).json({ success: true, message: 'Transaction completed successfully' });
    }
    else {
      res.status(400).json({
        success: false,
        message: 'Transaction failed. transaction type should be either card, netbanking or UPI.'
      });
    }
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const createTransaction = async (transactionType, refId) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpiresIn = (new Date()).getTime() + 600000;
  const INSERT_TRANSACTION_QUERY = `insert into transactions(transactionType, refId, otp, otpExpiresIn) values(?,?,?,?)`;
  try {
    const result = await pool.query(INSERT_TRANSACTION_QUERY, [transactionType, refId, otp, otpExpiresIn])
    if (result && result.insertId)
      return ({ otp, refId, id: result.insertId, transactionType })
    throw new Error("failed to create transaction. contact admin(+9039252383)");
  } catch (error) {
    throw error;
  }
}

const updateTransactionStatus = async (id, status) => {
  const UPDATE_TRANSACTION_QUERY = `update transactions set status = "${status}" where id = ${id}`;
  return await pool.query(UPDATE_TRANSACTION_QUERY);
}

module.exports = {
  verifyCard,
  verifyNetbanking,
  verifyUpi,
  verifyOtp
}