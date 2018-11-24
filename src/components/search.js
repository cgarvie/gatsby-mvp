import Autocomplete from 'react-autocomplete'
import React, { Component } from "react"
//import {Helmet} from "react-helmet"
//import { Link } from "gatsby"
import { matchProductToTerm, sortProducts } from '../../lib/utils'
import "../../css/search.css"


class SearchForm extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue
    }
    // this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  //expandSearchResults() {
  //  var se = this.st 
  //}

  render() {
    return (
      <Autocomplete
        
        value={this.state.value}
            inputProps={{ id: 'states-autocomplete' }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
        inputProps={{ placeholder: 'Search...' }}

        items={this.props.items}
        getItemValue={(item) => item}
        shouldItemRender={matchProductToTerm}
        sortItems={sortProducts}
        onChange={(event, value) => this.setState({ value })}
        onSelect={value => this.setState({ value })}
        renderMenu={children => (
              <div className="menu">
                {children}
              </div>
            )}
        renderItem={(item, isHighlighted) => (
              <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item}
              >{item}</div>
            )}
      />
      )
    }
}

export default SearchForm