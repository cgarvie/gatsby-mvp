import React from "react"
import { Link } from "gatsby"
import "../../css/style.css"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <div id="container" style={{ margin: `0 auto`, maxWidth: 950, padding: `1.25rem 1rem` }}>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }} id="logo">
        <h3 style={{ display: `inline` }}>nutrapedia <span style={{ fontSize: '14px' }}>.io</span></h3>
      </Link>
      
      <ul style={{ listStyle: `none`, float: `right` }}>
        <Link to="/supplements/">Search Supplements</Link>
        {/* <Link to="/drugs/">Search Drugs</Link> */}
        <Link to="/">home</Link>
      </ul>
      
    </header>
    {children}
  </div>
)