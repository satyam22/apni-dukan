import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import { Radio, Button } from 'antd';
import creditCardType from 'credit-card-type';

export default class DebitCard extends Component{
  state = {
    card: '',
    expiry: '',
    ccv: '',
    cardType: '',
    cardSubtype: ''
  }

  _onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { card } = this.state;
    const cardNumber = card.replace(/[-_]/g, "");
    const cardDetail = creditCardType(cardNumber)[0];
    console.log({ cardDetail });
    let cardType = null;
    if (cardDetail && cardDetail.niceType) cardType = cardDetail.niceType;
    console.log({ cardNumber })
    //  console.log(creditCardType(card)[0].niceType);
    return (
      <div className="credit-card">
        <div className="card-number">
          <div className="label">Debit Card number</div>
          <MaskedInput className="input" mask="1111-1111-1111-1111" name="card" size="20"
            onChange={this._onChange} placeholder = "" />
          <span className="card-type">{cardType}</span>
        </div>
        <div className="card-holder">
        <div className="label">Name on Card</div>
        <input className="input" name="cardHolder" placeholder = "" required 
         onChange = {this._onChange} />
        </div>
        <div className="card-cvv-exp">
          <div>
            <div className="label">Expiration Date</div>
            <MaskedInput className="input" mask="11/1111" name="expiry" placeholder="mm/yyyy" onChange={this._onChange} />
          </div>
          <div>
            <div className="label">CVV Code</div>
            <MaskedInput className="input" mask="111" name="ccv" onChange={this._onChange} placeholder=""/>
          </div>
        </div>
        <div className="submit" >
          <Button block>PROCEED TO PAY</Button>
        </div>
      </div>
    )
  }
}