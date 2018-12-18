import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-maskedinput';
import { Button, Affix, Alert } from 'antd';
import { verifyOtp } from './../../../api';
import Success from './Success';
import Failure from './Failure';

export default class VerifyOTP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      status: '',
      message: '',
    }
  }

  handleChange = (e) => {
    this.setState({ otp: e.target.value })
  }

  handleSubmit = (e) => {
    const { amount, transactionId } = this.props;
    const { otp } = this.state;
    verifyOtp(({ otp, amount, transactionId }), ({ success, message }) => {
      if (success === true) this.setState({ status: 'successful', message })
      else this.setState({ status: 'failed', message })
      // console.log({success, message })
    })
    this.setState({ status: 'pending' });
  }

  render() {
    const { amount, otp } = this.props;
    const { status, message } = this.state;
    if (status === 'successful') return <Success message={message} />
    if (status === 'failed') return <Failure message={message} />
    return (
      <div className="verify-otp">
        <Affix className="affix">
          <Alert message={`OTP you need to enter to complete this transaction: ${otp}`} type='info' />
        </Affix>
        <div className="amount">
          <div className="label">Amount</div>
          <input className="input" type="text" value={amount} disabled />
        </div>
        <div className="otp">
          <div className="label">OTP</div>
          <MaskedInput className="input" mask="1111" name="otp" onChange={this.handleChange} placeholder="" />
        </div>
        <div className="submit" >
          <Button block onClick={this.handleSubmit}
            loading={status === 'pending' ? true : false}>SUMBIT</Button>
        </div>
        <div className="go-back"><Link to='/'>Go to Home Page </Link></div>
      </div>
    )
  }
}