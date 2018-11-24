import React, { Component } from "react"
import Layout from "../components/layout"
import SearchResultTable from "../components/sert"
import SearchForm from "../components/search"
import { Link, navigate } from "gatsby"
import {Helmet} from "react-helmet";

//import {Helmet} from "react-helmet";
import '../../css/serp.css';
import '../utils/misc.js'

/*

TO DO:

- make the form work when u just press enter

*/


//export default ({ pageContext: { obj, query } }) => {

class Serp extends Component {

  constructor(props) {
    super(props)

    var suggested_queries = []
    try {
	    suggested_queries = this.props.pageContext.files
		suggested_queries = suggested_queries.map(f => {
				var x = f.split('.')[0].split('/')
				return x[x.length-1] //.replace('-',' ')
			})
		}
	catch(err) {
		console.log(err)
		}


	var finishedLoading = true
	var data = null
	var query = ""

	try {
		data = this.props.pageContext.obj	
		query = this.props.pageContext.query
		}
	catch(err) {
		console.log(err)
		}

	if (data === null) {
		if (this.props.location.href) {
		if (this.props.location.href.includes('/for/')) {
			//var args = getJsonFromUrl(this.props['*'].toLowerCase().split('/for/')[1])
			/*
			try { 
				query = this.props['*'].toLowerCase().split('/for/')[1].replace('_',' ')
			} catch {
				navigate('/supplements/')	
			}
			*/
			// Switch to location.pathname , says discord #gatsby
			query = this.props['*'].toLowerCase().split('/for/')[1].replace('_',' ')
			if (query) {
				//query = args.query

			    finishedLoading = false

			    let fd = new FormData()
			    fd.append('query', query)
			    console.log(fd)

				fetch("https://107.170.112.163:5000/api", {method: "POST", body: fd})
				      .then(response => response.json(),
				            rejection => alert(rejection))
				      .then(responseData => {
				      		console.log(responseData)
				            this.handleSERP(responseData)
				            })
			}
		}
		}
	}

    this.state = {
    	finishedLoading: finishedLoading,
    	query: query,
    	data: data,
    	suggestedQueries: suggested_queries
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSERP = this.handleSERP.bind(this)
    this.clearEverything = this.clearEverything.bind(this)
    }

    componentDidUpdate() {
    	//this.setState({finishedLoading: true})
    }

    clearEverything(e) {
    	e.preventDefault()
		navigate('/supplements/')
    }

    handleSubmit(e) {
	    e.preventDefault()
	    var q = this.searchForm.state.value.toLowerCase()
		console.log(q)
		if (this.state.suggestedQueries.includes(q)) {
			navigate('/supplements/'+q.replace(' ','-'))
		} else {
			navigate('/supplements/for/'+q.replace(' ','_'))
			/*
			if (this.props.pathContext.query.toLowerCase() !== "supplements") {
				
			} else {
				// search
			}
			*/
		}
    }

    handleSERP(responseData) {
	    console.log(responseData)

	    // Check if results were blank.
	    if ('reply' in responseData) {
	      this.setState({finishedLoading: true})
	      console.log(responseData.reply)
	    }
	    
	    
	    // Update Table
	    // todo: This is ugly and should probably use some()
	    this.setState({data: responseData.data, 
	    				finishedLoading: true})
	  }

    render() {
    	console.log(this.props.pathContext)
    	return (
		  <Layout>
		  <Helmet>
	        <title>Supplement Search</title>
	      </Helmet>
		  <p>Search your health condition to learn which supplements are helping others find relief.</p>
		  		<div className="searchBox">
			        <form onSubmit={this.handleSubmit}>
				        <SearchForm 
				          ref={(searchForm) => {this.searchForm = searchForm;}}
				          initialValue={this.state.query}
				          items={this.state.suggestedQueries}
				        />&nbsp;
				        <input type="submit" value="Search" className="btn-blue active" />
				        { this.state.finishedLoading === false &&
				        <b style={{paddingLeft: '1em'}}>Loading...</b>
				        }
				        { ((this.state.finishedLoading === true)&&(this.state.query)) &&
				        <span style={{paddingLeft: '1em'}}><a href="#" onClick={this.clearEverything}>Clear</a></span>
				    	}
		        	</form>
		        </div>
		        { (this.state.data != null) &&
				  	<SearchResultTable 
				  		query={this.state.query}
				  		data={this.state.data}
				  	/>
				}
			  	<p>
			  		Suggested searches: {this.state.suggestedQueries.map((f, i) => {
			  			var url = "/supplements/" + f.replaceAll(' ','-') //.toLowerCase()
			  			return (
			  			<span key={i}>
			  				<Link to={url}>{f}</Link> 
			  				&nbsp;
			  			</span>
			  		
			  		)})}
			  	</p>
		  </Layout>
		)
	}
}

export default Serp
