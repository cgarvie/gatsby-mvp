//import { withPrefix } from 'gatsby'
import React, { Component } from "react"

class ProductImage extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			src: '/img/products/'+this.props.ASIN+'.jpg'
		}
		this.usePlaceholder = this.usePlaceholder.bind(this)

	}
	usePlaceholder() {
		if (this.state.src != '/img/PlaceholderProductImage.jpg') {
			this.setState({
				src: '/img/PlaceholderProductImage.jpg'
			})
		}
	}
	render() {
		  	return (
		  		<img src={this.state.src} className="ProductImage" onError={this.usePlaceholder} />
		 	)
	}

}

export default ProductImage