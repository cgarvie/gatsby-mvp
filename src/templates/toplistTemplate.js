import React, { Component } from "react"
import Layout from "../components/layout"
import ProductImage from "../components/product-image"
import {Helmet} from "react-helmet";
import '../utils/misc.js'
import { graphql } from 'gatsby'


/*
result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fileAbsolutePath.includes('/markdown/pages/')) {
*/



class TopListPage extends Component {

  constructor(props) {
    super(props)
  }

render() {
    //const { markdownRemark } = this.props.data // data.markdownRemark holds our post data
    //const { frontmatter, html } = markdownRemark
    console.log(this.props.data)
    var html = ""
    this.props.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fileAbsolutePath.includes('/markdown/snippets/'+this.props.pageContext.keyword)) {
        html = node.html
      }})
    return (
        <Layout>
            <Helmet>
                <title>Best {this.props.pageContext.keyword.toTitleCase()} Supplements</title>
            </Helmet>
            <h1>Best {this.props.pageContext.keyword.toTitleCase()} Supplements</h1>
            <div
            className="snippet"
            dangerouslySetInnerHTML={{ __html: html }}
            />
            <p>Below, we've listed the best {this.props.pageContext.keyword} supplements available. We've analyzed customer behavior and reviews on Amazon.com in order to figure out which ones are best. The lower the number, the stronger our recommendation.</p>
            <ol className="toplist">
            {this.props.pageContext.obj.slice(0,15).map((product, i) => (
              <li key={i} style={{ textAlign: 'center' }}>
                <span className="ListNumber">{i+1}</span>
                <div style={{ width: '250px', height: '250px', margin: '0 auto' }}>
                  <ProductImage ASIN={product[1].ASIN} />
                </div>
                <p><b><a href={"http://www.amazon.com/dp/"+product[1].ASIN}>{product[1].title}</a></b></p>
                { (product[1].features) &&
                  <ul className="features">
                  {product[1].features.map((feature, i) => (
                    <li key={i}>
                      {feature}
                    </li>
                  ))}
                  </ul>
                }
              </li>
            ))}
             </ol>
        </Layout>
    )
  }

}

export default TopListPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
            html
            frontmatter {
              title
              path
              date
              _PARENT
            }
          }
        }
      }
  }
`