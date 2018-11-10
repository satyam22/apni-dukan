import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import { Button, message } from 'antd';
import creditCardType from 'credit-card-type';
import luhn from 'luhn';
import { verifyCard } from './../../../api';

export default class CreditCard extends Component {
  state = {
    card: '',
    expiry: '',
    cvv: '',
    cardHolder: '',
    status: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { card, expiry, cvv, cardHolder } = this.state;
    // console.log({ card, expiry, cvv, cardHolder });
    const cardNumber = card.replace(/[-_]/g, "");
    const cardDetail = creditCardType(cardNumber)[0];
    // console.log({ cardDetail });
    let cardType = null;
    if (cardDetail && cardDetail.niceType) cardType = cardDetail.niceType;
    if (!cardType) {
      return message.error("Error: Invalid card type");
    }
    if (!luhn.validate(cardNumber)) {
      return message.error("Card number is invalid");
    }
    verifyCard(({ cardHolder, cvv, expiry, cardNumber, cardType }), (data) => {
      if (data.success) {
        this.props.proceedToVerifyOTP(data.otp, data.id);
        this.setState({ status: 'successful' });
      }
      else {
        const errorMessage = data.message || 'Failed to validate card details.'
        message.error(errorMessage);
        this.setState({ status: 'failed' });
      }
    })
    this.setState({ status: 'pending' });
    // console.log({ card, expiry, cvv, cardHolder, cardNumber, cardType });
  }

  render() {
    const { card, status } = this.state;
    const cardNumber = card.replace(/[-_]/g, "");
    const cardDetail = creditCardType(cardNumber)[0];
    
    let cardType = null;
    if (cardDetail && cardDetail.niceType) cardType = cardDetail.niceType;
    return (
      <div className="credit-card">
        <div className="card-number">
          <div className="label">Card number</div>
          <MaskedInput className="input" mask="1111-1111-1111-1111" name="card" size="20"
            onChange={this.handleChange} placeholder="" />
          <span className="card-type">{cardType}</span>
        </div>
        <div className="card-holder">
          <div className="label">Name on Card</div>
          <input className="input" name="cardHolder" placeholder="" required
            onChange={this.handleChange} />
        </div>
        <div className="card-cvv-exp">
          <div>
            <div className="label">Expiration Date</div>
            <MaskedInput className="input" mask="11/1111" name="expiry" placeholder="mm/yyyy"
              onChange={this.handleChange} />
          </div>
          <div>
            <div className="label">CVV Code</div>
            <MaskedInput className="input" mask="111" name="cvv" onChange={this.handleChange}
              placeholder="" />
          </div>
        </div>
        <div className="submit" >
          <Button block onClick={this.handleSubmit}
            loading={status === 'pending' ? true : false} >PROCEED TO PAY</Button>
        </div>
      </div>
    )
  }
}