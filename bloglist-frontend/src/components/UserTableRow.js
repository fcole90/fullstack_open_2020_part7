import React from 'react'
import { Link } from 'react-router-dom'

import { 
  TableCell,
  TableRow} from '@material-ui/core'

const UserTableRow = ({user}) => (
  <TableRow>
    <TableCell>
      < Link to={`/users/${user.id}`}>
        {user.name}
      </Link>
    </TableCell>
    <TableCell>
      {user.blogs?.length}
    </TableCell>
  </TableRow>
)

export default UserTableRow