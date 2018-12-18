import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import UPI from './UPI';
import CreditCard from './CreditCard';
import NetBanking from './NetBanking';
import VerifyOTP from './VerifyOTP';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proceedToVerifyOTP: false,
      otp: '',
      transactionId: ''
    }
  }
  handleProceedToVerifyOTP = (otp, transactionId) => {
    this.setState({ proceedToVerifyOTP: true, otp, transactionId })
  }

  render() {
    const { match, totalAmount } = this.props;
    // console.log({ match, totalAmount });
    const { proceedToVerifyOTP, otp, transactionId } = this.state;
    return proceedToVerifyOTP === true
      ? (<VerifyOTP otp={otp} amount={totalAmount} transactionId={transactionId} />)
      : (
        <div className="payment">
          <div className="navigation">
            <div className="navigation-item"><Link to={`${match.path}/card`}>Credit/Debit Card</Link></div>
            <div className="navigation-item"><Link to={`${match.path}/netbanking`}>Net Banking</Link></div>
            <div className="navigation-item"><Link to={`${match.path}/upi`}>UPI Payment</Link></div>
          </div>
          <div className="payment-forms">
            <Switch>
              <Route path={`${match.path}/card`} render={
                () => <CreditCard proceedToVerifyOTP={this.handleProceedToVerifyOTP} />} />
              <Route path={`${match.path}/netbanking`} render={
                () => <NetBanking proceedToVerifyOTP={this.handleProceedToVerifyOTP} />} />
              <Route path={`${match.path}/upi`} render={
                () => <UPI proceedToVerifyOTP={this.handleProceedToVerifyOTP} />} />
              <Redirect to = {`${match.path}/card`} />
            </Switch>
            <Link to = '/' className="go-back">Go Back</Link>
          </div>
        </div>
      )
  }
}

export default Payment;