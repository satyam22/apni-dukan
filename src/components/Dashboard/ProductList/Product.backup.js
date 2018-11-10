import React, { Component } from 'react';

export default class Product extends Component{
  render() {
    const { name, price, quantity, imageUrl } = this.props;
    return (
      <div style={styles.product}>
        <div><img alt={name} src= {imageUrl} style={styles.productImage}/></div>
        <div>
          <div>{name}</div>
          <div>{price}</div>
        </div>
      </div>
    )
  }
}

const styles = {
product:{width:'300px', maxHeight: '500px', height: '500px', padding: '20px', margin: '10px'},
productImage: {
  maxHeight: '350px',
  maxWidth: '300px'
}
}