import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initialise as initialiseUsers } from '../reducers/usersReducer'

const UserView = ({userMatch, users, getAllUsers}) => {

  useEffect(() => {
    getAllUsers()
  },[getAllUsers])

  const user = users && userMatch ? users.find(u => u.id === userMatch.params.id) : null

  if (!user) {
    return null
  }

  return (
  <div>
    <h2>{user.name}</h2>
    { user.blogs.length > 0
    ? (<>
      <h4>added blogs</h4>
      { user.blogs.map((blog => (
        <p key={blog.id}>
          {blog.title}
        </p>
      ))) }
    </>)
    : (
      <h4>Did not create any blog yet</h4>
    )
  }
    
  </div>
)}

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(initialiseUsers())
})

const mapStateToProps = state => ({
  users: state.users
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)