import React from 'react';
import { Button } from 'antd';

const Success = ({ message }) => (
  <div className='success-page'>
    <div className="message">Payment completed successfully</div>
    <div className="sub-message">{message}</div>
    <div className="go-back"><Button href='/dashboard'>Go to Homepage to Shop more !</Button></div>
  </div>
)

export default Success;