import React, { Component } from 'react';
import { Button, Select, message } from 'antd';
import banks from './banks';
import { verifyNetbanking } from './../../../api';

const Option = Select.Option;

const options = banks.map(bank => <Option value={bank} key={bank} >{bank}</Option>);

export default class NetBanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: '',
      customerId: '',
      password: '',
      status: ''
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBankName = (bankName) => {
    this.setState({bankName});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { bankName, customerId, password } = this.state;
    console.log({ bankName, customerId, password });

    verifyNetbanking(({bankName, customerId, password }), (data) => {
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
  render() {
    const { status } = this.state;
    return (
      <div className="net-banking">
        <div className="bank-name">
          <Select
            showSearch
            style={{ width: 360 }}
            placeholder="Select bank"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={this.handleBankName}
          >
          {options}
          </Select>
        </div>
        <div className="customer-id">
          <div className="label">Customer ID</div>
          <input type="text" name="customerId" onChange={this.onChange} className = "input" />
        </div>
        <div className="customer-password" >
          <div className="label">Password</div>
          <input type="password" name="password" onChange={this.onChange} className = "input" />
        </div>
        <div className="submit">
          <Button block onClick = {this.handleSubmit}
          loading = { status === 'pending'? true: false} >PROCEED TO PAY</Button>
        </div>
      </div>
    )
  }
}