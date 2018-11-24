import React, { Component } from "react"
import '../utils/misc.js'


class Review extends Component {

	render() {
		
		var review_good_or_bad = "review-good"
		var title = this.props.title ? this.props.title : ''
		var text = this.props.text ? this.props.text : ''
		if ((this.props.stars == "1.0") || (this.props.stars == "2.0")) {
			review_good_or_bad = "review-bad"
		}
		return (
			
				<div className={'review '+review_good_or_bad + (this.props.hidden ? ' hidden' : '')}>
					<h5>{this.props.stars} - <span dangerouslySetInnerHTML={{ __html: title.highlightKeyword(this.props.query) }}></span></h5>
					<blockquote dangerouslySetInnerHTML={{ __html: text.highlightKeyword(this.props.query) }} ></blockquote>
				</div>
							 
		)
	}

}


export default Review