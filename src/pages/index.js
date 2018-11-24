import React from "react"
import { graphql } from "gatsby"
import PostLink from "../components/post-link"
import Layout from "../components/layout"
import { Link } from "gatsby"
import {Helmet} from "react-helmet";


const IndexPage = ({
  data: {
    allSitePage: { sitePageEdges },
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .filter(edge => edge.node.fileAbsolutePath.includes('/markdown/pages/'))
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);
  const Conditions = sitePageEdges
    .filter(edge => edge.node.path.includes('/supplements/'));
  const Niches = sitePageEdges
    .filter(edge => edge.node.path.includes('/best-'));
  var Conditions2 = Conditions.map(function(edge) {
    var a = edge.node.path.replace("/supplements/", "").replace("/","").replace("-"," ")
    var b = edge.node.path
    return [a, b]
  });
  var Niches2 = Niches.map(function(edge) {
    var a = edge.node.path.replace("/best-", "").replace("-supplements/", "").replace("-"," ")
    var b = edge.node.path
    return [a, b]
  });
  Conditions2.sort();
  Niches2.sort();
  return (
  <Layout>
  <Helmet>
    <title>Search Supplement Reviews, Find the Best Supplements</title>
  </Helmet>
  <h3>The world&#39;s biggest searchable database of dietary supplement reviews.</h3>
  <hr />
  <h3>Find the best ______ supplement,</h3>
    <ul className="inline">
    { Niches2.map(function(niche, i) {
      if (niche[0]) {
        return (
            <li key={i}><Link to={niche[1]}>{niche[0]}</Link></li>
        ) }
      }
      ) }
    </ul>
  <h3>or discover the best supplements for <Link to="/supplements/">[Type your condition here]</Link>...</h3>
    <ul className="inline">
    { Conditions2.map(function(niche, i) {
      if (niche[0]) {
        return (
            <li key={i}><Link to={niche[1]}>{niche[0]}</Link></li>
        ) }
      }
      ) }
    </ul>
  <h3>or read the latest from our blog:</h3>
    <ul>
      {Posts}
    </ul>
  </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {

    allSitePage {
      sitePageEdges: edges {
        node {
          path
        }
      }
    }

    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fileAbsolutePath
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }

  }
`