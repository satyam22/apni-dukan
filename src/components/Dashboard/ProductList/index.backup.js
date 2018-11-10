import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component{
  render(){
    const { products } = this.props;
const contents = products.map(
  ({productName, price, quantity, imageUrl }) => <Product 
  name={productName} price={price} quantity={quantity} imageUrl={imageUrl} />);
  return(<div style={styles.products}> {contents}</div>)
  };
}

export default ProductList;

const styles = {
products: {
  marginTop: '20px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center'
}
}