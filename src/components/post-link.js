import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <li>
    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
    <br /><i><span className="smallText">Posted on {post.frontmatter.date}</span></i>
  </li>
)

export default PostLink