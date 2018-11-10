import React from 'react';
import { Carousel, Row, Col } from 'antd';
const Offers = ({ withOffer }) => (
  <Row>
    <Col span={22} offset = {1}>
    <Carousel autoplay style={{width: '70%'}}>
    {withOffer.map((offer,index) => (
      <div key = {index} ><img src={offer.imageUrl} style={{height: '300px', maxWidth: '100%', margin: 'auto'}}/></div>
    ))}
  </Carousel>
    </Col>
  </Row>
);

export default Offers;