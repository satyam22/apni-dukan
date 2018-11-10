import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import { Button, Affix, Alert } from 'antd';

export default class VerifyOTP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      otp: ''
    }
  }
  handleChange = (e) => {
    this.setState({ otp: e.target.value })
  }
  render() {
    const { amount, otp } = this.props;
    return (
      <div className="verify-otp">
        <Affix className = "affix">
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
          <Button block>SUMBIT</Button>
        </div>
      </div>
    )
  }
}