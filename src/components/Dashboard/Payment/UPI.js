import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import { Button, message } from 'antd';
import { verifyUpi } from './../../../api';

export default class UPI extends Component{
  constructor(props){
    super(props); 
    this.state = {
      upiAddress: '',
      upiPin: '',
      status: ''
    };
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { upiAddress, upiPin } = this.state;
    console.log({ upiAddress, upiPin });

    verifyUpi(({ upiAddress, upiPin }), (data) => {
      if(data.success){
        this.props.proceedToVerifyOTP(data.otp, data.id);
      }
      else {
        const errorMessage = data.message || 'Failed to validate card details.'
        message.error(errorMessage);
      }
    })
    this.setState({status: 'pending'});
  }
  render(){
    const { status } = this.state;
    return(
      <div className="upi">
      <div className="upi-Address">
        <div className="label">UPI Address</div>
        <input type="text" name="upiAddress" onChange={this.onChange} className = "input" />
      </div>
      <div className="upi-pin" >
        <div className="label">UPI PIN</div>
        <MaskedInput className="input" mask="111111" name="upiPin" onChange={this.onChange} placeholder=""/>
      </div>
      <div className="submit">
        <Button block onClick = {this.handleSubmit}
        loading = {status === 'pending' ? true: false }>PROCEED TO PAY</Button>
      </div>
    </div>
    )
  }
}