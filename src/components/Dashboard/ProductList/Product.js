import React, { Component } from "react";
import Counter from "./../Counter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProdcut: {},
      isAdded: false
    };
  }
  addToCart(image, name, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity
        }
      },
      function () {
        this.props.addToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      function () {
        this.timer = setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }
  quickView(image, name, price, id) {
    this.setState(
      {
        quickViewProdcut: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function () {
        this.props.openModal(this.state.quickViewProdcut);
      }
    );
  }
  componentWillUnmount(){
    clearTimeout(this.timer);
  }
  render() {
    const { imageUrl, name, id, quantity: totalQuantity, productQuantity: quantity, offer } = this.props;
    let { price } = this.props;
    const priceContent = offer === 0
      ? (<p className="product-price">{price}</p>)
      : (<div>
        <p className="product-slashed-price">{price}</p>
        <p className="product-price">{price * (100 - offer) / 100}</p>
      </div>
      )
    if(offer !== 0) price = price*(100-offer)/100;
    
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={imageUrl}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              imageUrl,
              name,
              price,
              id,
              quantity
            )}
          />
        </div>
        <h4 className="product-name">{name}</h4>
        {priceContent}
        <p className="product-quantity">Only {totalQuantity} Pcs. left</p>
        <Counter
          productQuantity={quantity}
          totalQuantity={totalQuantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
        <div className="product-action">
          <button
            className={!this.state.isAdded ? "" : "added"}
            type="button"
            onClick={this.addToCart.bind(
              this,
              imageUrl,
              name,
              price,
              id,
              quantity
            )}
          >
            {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
