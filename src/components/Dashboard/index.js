import React, { Component } from 'react';
import { connect } from 'react-redux';
import Offers from './Offers'
import Header from "./Header";
import Products from "./ProductList";
// import Footer from "./../Footer";
import QuickView from "./QuickView";
import "./../../scss/style.scss";
import Payment from './Payment';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
      proceedToCheckout: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleProceedToCheckout = this.handleProceedToCheckout.bind(this);
  }

  handleSearch(e) {
    this.setState({ term: e.target.value });
  }

  handleMobileSearch() {
    this.setState({ term: "" });
  }

  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex(x => x.id === productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id === id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  handleProceedToCheckout(){
    this.setState({proceedToCheckout: true})
  }
  render() {
    const { withOffer, withoutOffer, match } = this.props;
    const products = [...withOffer, ...withoutOffer];
    const { proceedToCheckout, totalAmount } = this.state;
    console.log({products});
    return (proceedToCheckout === true) ? (<Payment totalAmount={totalAmount} match={match}/>):(
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
          handleProceedToCheckout = { this.handleProceedToCheckout }
        />
        <Offers withOffer={withOffer} />
        <Products
          products={products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />
        {/* <Footer /> */}
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
withOffer: products.withOffer,
withoutOffer: products.withoutOffer
})
export default connect(mapStateToProps)(Dashboard);