import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class QuickView extends Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside.bind(this),true);
  }

  handleClickOutside(event) {
    const domNode = findDOMNode(this.refs.modal);
    if (!domNode || !domNode.contains(event.target)) {
      this.props.closeModal();
    }
  }

  handleClose() {
    this.props.closeModal();
  }

  render() {
    return (
      <div className={ this.props.openModal ? "modal-wrapper active" : "modal-wrapper" } >
        <div className="modal" ref="modal">
          <button type="button" className="close" onClick={this.handleClose.bind(this)} >
            &times;
          </button>
          <div className="quick-view">
            <div className="quick-view-image">
              <img
                src={this.props.product.image}
                alt={this.props.product.name}
                style={{ maxHeight: '450px', maxWidth: '450px' }}
              />
            </div>
            <div className="quick-view-details">
              <span className="product-name">{this.props.product.name}</span>
              <span className="product-price">{this.props.product.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickView;
