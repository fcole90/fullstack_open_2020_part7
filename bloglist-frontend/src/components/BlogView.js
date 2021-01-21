import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import Blog from './Blog'
import { initialise as initialiseBlogs } from '../reducers/blogsReducer'

const BlogView = ({blogs, blogMatch}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs()) 
  },[dispatch])

  const blog = blogs && blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  if (!blog) {
    return null
  }

  return (
    <Blog key={blog.id} blog={blog} keepAlwaysExpanded={true} />
)}

const mapDispatchToProps = dispatch => ({
  getAllBlogs: () => dispatch(initialiseBlogs())
})

const mapStateToProps = state => ({
  blogs: state.blogs
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView)