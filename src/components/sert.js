import React, { Component } from "react"
import Review from "./review"
import ProductImage from "../components/product-image"
import {Helmet} from "react-helmet";
import '../utils/misc.js'

class SearchResultTable extends Component {

	constructor(props) {
	  super(props)
	  var data = props.data
	  data.sort((a,b) => (a.SortA > b.SortA) ? -1 : ((b.SortA > a.SortA) ? 1 : 0)); 
	  this.state = {
	  		query: props.query,
      		data: data,
      		sortMethod: 'A',
      		hideBadReviews: true,
      		hideMatchingProducts: true
    	}
      this.selectSortMode = this.selectSortMode.bind(this)
      this.showHideBadReviews = this.showHideBadReviews.bind(this)
      this.showHideMatchingProducts = this.showHideMatchingProducts.bind(this)
	}

	selectSortMode(e){
		var data = this.state.data
		if (e.target.name === 'A') {
			// first sort by ASIN so it's deterministic/non-random
			data.sort((a,b) => (a.ASIN > b.ASIN) ? -1 : ((b.ASIN > a.ASIN) ? 1 : 0)); 
			data.sort((a,b) => (a.SortA > b.SortA) ? -1 : ((b.SortA > a.SortA) ? 1 : 0)); 
			this.setState({data: data, sortMethod: e.target.name});
		}
		else if (e.target.name === 'B') {
			// first sort by ASIN so it's deterministic/non-random
			data.sort((a,b) => (a.ASIN > b.ASIN) ? -1 : ((b.ASIN > a.ASIN) ? 1 : 0));
			data.sort((a,b) => (a.SortB > b.SortB) ? -1 : ((b.SortB > a.SortB) ? 1 : 0)); 
    		this.setState({data: data, sortMethod: e.target.name});
    	}
	}

	showHideBadReviews(e){
		if (e.target.checked) {
			this.setState({hideBadReviews: true})
		}
		else {
			this.setState({hideBadReviews: false})
		}
	}

	showHideMatchingProducts(e){
		if (e.target.checked) {
			this.setState({hideMatchingProducts: true})
		}
		else {
			this.setState({hideMatchingProducts: false})
		}
	}

	render() {
		const hideBadReviews = this.state.hideBadReviews
		const hideMatchingProducts = this.state.hideMatchingProducts
		const query = this.state.query
		function isHidden(rating) {
			if ((hideBadReviews === true) && 
				((rating === "1.0") || (rating === "2.0") || (rating === "3.0"))) {
				return true
			}
			else {
				return false
			}
		}
		function shouldHideProduct(s) {
			if (hideMatchingProducts === false) {
				return false
			}
			else if (s === null) {
				return false
			}
			else if (s.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
				return true
			}
			else {
				return false
			}
		}
		return (
			<div>
				<h1 style={{ display: 'none' }}>Best Supplements for {this.state.query}</h1>
				<Helmet>
                	<title>Best Supplements for {this.state.query.toTitleCase()} - Treatments for {this.state.query.toTitleCase()}</title>
                </Helmet>
				<div id="toolbar">
					<span>Sort by: </span>
					<button className={`btn-blue ${this.state.sortMethod === "A"? 'active': ''}`} onClick={this.selectSortMode} name='A'>Most Mentions</button>
					&nbsp;
					<button className={`btn-blue ${this.state.sortMethod === "B"? 'active': ''}`} onClick={this.selectSortMode} name='B'>Least Controversial</button>
					<ul className="toolList">
						<li>
							<input type="checkbox" onClick={this.showHideBadReviews} defaultChecked={this.state.hideBadReviews} /><span>Hide bad reviews</span>
						</li>
						<li>
							<input type="checkbox" onClick={this.showHideMatchingProducts} defaultChecked={this.state.hideMatchingProducts} /><span>Hide obvious recommendations</span>
						</li>
					</ul>
				</div>
				<div>
					<div id="TOC">
						<h3>Top Recommendations</h3>
						<ol>
							{this.state.data.slice(0, 10).map((product, i) => (
								<li key={i}><a href={"#product-"+(i+1)}>{product.ProductName.shortenToMaxLen(60)}</a></li>
								)
							)}
						</ol>
					</div>
					<div id="contents">
						{this.state.data.map((product, i) => (
					  		<div 
					  			key={i}
					  			id={"product-"+(i+1)}
					  			className={'product' + (shouldHideProduct(product.ProductName) ? ' hidden' : '')}
					  		>
					  			<div className="product-image">
				                  <ProductImage ASIN={product.ASIN} />
				                </div>
				                <div>
									<h3><span className="enumeration">{i+1}.</span> { product.ProductName }</h3>
									{product.Reviews.map((review, i) => (
										<Review 
											key={i}
											query={this.state.query}
											stars={review.rating}
											hidden={isHidden(review.rating)}
											title={review.title}
											text={review.text}
										/>
									))}
								</div>
								<div style={{clear: "both"}}></div>

							</div>
						))}
					</div>
				</div>
		</div>
		)
	}

}


export default SearchResultTable