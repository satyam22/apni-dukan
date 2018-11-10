import React from 'react';
import { Button } from 'antd';

const Failure = ({ message }) => (
  <div className='failure-page'>
    <div className="message">Payment failed</div>
    <div className="sub-message">{message}</div>
    <div className="go-back"><Button href='/dashboard'>Go to Homepage to try again</Button></div>
  </div>
)

export default Failure;