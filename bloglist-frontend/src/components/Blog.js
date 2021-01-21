import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { ListItem, Input, Typography as T } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


import { useField } from '../hooks'
import { 
  like as likeBlog,
  deleteOne as deleteBlog,
  comment as commentBlog
} from '../reducers/blogsReducer'


const Blog = ({ blog, loggedUser, handleClickLikeOf, handleClickDeleteOf, keepAlwaysExpanded, keepAlwaysCompressed, handleAddCommentOf }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [comment, resetComment] = useField("text", true)

  const history = useHistory()

  return (
    <ListItem className="blog">
      <Card>
        <CardContent>
          <T v='h4'>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} 
            </Link>
            <span style={{fontStyle: 'italic', fontSize: 70 + '%', marginBottom: 1 + 'em',}}>by {blog.author}</span>
          </T>
          
          { (!keepAlwaysCompressed && (keepAlwaysExpanded || isExpanded)) && (
            <>
              <T v='h3'>
                Comments:
              </T>
              
              
            </>
          )}
          {
            (!keepAlwaysCompressed && (keepAlwaysExpanded || isExpanded)) && (
              <>
                <div><T v='p'>Url: {blog.url}</T></div>
                <div><T v='p'>Likes: 
                  <span className='likes-amount'> {blog.likes}</span>
                  </T>
                </div>
                <div><T v='p'>Author: {blog.author}</T></div>

                  <div style={{marginTop: 2 + 'em'}}>
                    <T v='h4'>Comments</T>
                    <div style={{
                      marginBottom: 1 + 'em',
                      padding: 1 + 'em',
                      backgroundColor: 'lightgrey', 
                      fontSize: 80 + '%', 
                      borderRadius: 0.5 + 'em'
                      }}>
                      { blog.comments.map((comment, i) =>
                        <T v='p' style={{paddingBottom: 0.2 + 'em'}}key={`${comment}__${i}`}>{comment}</T>
                      )}
                    </div>
                    <Input {...comment}></Input>
                    <Button variant="contained" size="small" style={{marginLeft: 1 + 'em'}}   
                      className='add-comment-button' 
                      onClick={(event) => {event.preventDefault(); handleAddCommentOf(blog, comment.value); resetComment() }}>
                        Add comment
                    </Button>
                    
                    
                  </div>
                  
              </>
            )
          }
        </CardContent>
        { (!keepAlwaysCompressed && (keepAlwaysExpanded || isExpanded)) && (
        <CardActions>
          {(!keepAlwaysExpanded && !keepAlwaysCompressed)  && 
            <button className='view-button' onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'hide' : 'view'}
            </button>
          }

          { (!keepAlwaysCompressed && (keepAlwaysExpanded || isExpanded)) && (
            <>
            <Button size="small" className='like-button' onClick={(event) => {event.preventDefault(); handleClickLikeOf(blog)}}>
              Like
            </Button>
            <Button size="small" className='delete-button' 
            onClick={(event) => {event.preventDefault(); handleClickDeleteOf(blog); history.push('/')}}
            disabled={loggedUser.id === blog.user.id}>
              Delete
          </Button>
          </>
          )}
        </CardActions>
        )}  
      </Card>
    </ListItem>
  )
}


const mapDispatchToProps = dispatch => ({
  handleClickLikeOf: (blog) => {
    dispatch(likeBlog(blog))
  },
  handleClickDeleteOf: (blog) => {
    dispatch(deleteBlog(blog))
  },
  handleAddCommentOf: (blog, comment) => {
    dispatch(commentBlog(blog.id, comment))
  }
})


const mapStateToProps = state => ({
  loggedUser: state.login
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Blog
)