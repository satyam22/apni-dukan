import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "./../loaders/Products";
import NoResults from "./../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Products extends Component {

  searchingFor(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }
  render() {
    const { products, searchTerm } = this.props;

    const productsData = products
      .filter(({productName}) => (!searchTerm || productName.toLowerCase().includes(searchTerm.toLowerCase())))
      .map(({ productName, price, imageUrl, quantity, offer }) => {
        return (
          <Product
            key={productName}
            price={price}
            name={productName}
            imageUrl={imageUrl}
            id={productName}
            quantity={quantity}
            offer = {offer}
            addToCart={this.props.addToCart}
            productQuantity={this.props.productQuantity}
            updateQuantity={this.props.updateQuantity}
            openModal={this.props.openModal}
          />
        );
      });

    let view;
    if (productsData.length <= 0 && !searchTerm) {
      view = <LoadingProducts />;
    } else if (productsData.length <= 0 && searchTerm) {
      view = <NoResults />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="div"
          className="products"
        >
          {productsData}
        </CSSTransitionGroup>
      );
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;
