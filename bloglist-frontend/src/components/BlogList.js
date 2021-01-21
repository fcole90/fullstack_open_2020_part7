import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import { List } from '@material-ui/core'

import Blog from './Blog'
import { initialise as initialiseBlogs } from '../reducers/blogsReducer'

const BlogList = ({blogs}) => {
  
  console.log("blogs:", blogs);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs()) 
  },[dispatch])

  return (   
    <List id="blog-list">
      {blogs.sort((fst, snd) => snd.likes - fst.likes).map(blog =>
        <Blog key={blog.id} blog={blog} keepAlwaysCompressed={true} />
      )}
    </List>
  )  
}


const mapStateToProps = state => ({
  blogs: state.blogs
})

export default connect(
  mapStateToProps
)(BlogList)