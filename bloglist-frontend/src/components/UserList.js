import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { 
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper } from '@material-ui/core'

import UserTableRow from './UserTableRow'
import { initialise as initialiseUsers } from '../reducers/usersReducer'


const UserList = ({ users, getAllUsers }) => {
  console.log('Render UserList')
  useEffect(() => {
    getAllUsers()
  },[getAllUsers])

  if (users.length < 1) {
    return null
  }

  return (
    <TableContainer component={Paper} id="users-list">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              name
            </TableCell>
            <TableCell>
              blogs
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.sort((fst, snd) => snd.blogs?.length - fst.blogs?.length).map(user =>    
            <UserTableRow user={user} key={user.id}/>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )  
}


const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(initialiseUsers())
})

const mapStateToProps = state => ({
  users: state.users
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)