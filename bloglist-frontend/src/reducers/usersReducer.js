import usersService from '../services/users'


export const initialState = []


export const createNew = (content) => (
  async dispatch => {
    dispatch({
      type: 'CREATE',
      data: await usersService.create(content)
    })
  }
)

export const deleteOne = (data) => (
  async dispatch => {
    dispatch({
      type: 'DELETE',
      data
    })
  }
)

export const initialise = () => (
  async dispatch => (
    dispatch({
      type: 'INIT',
      data: await usersService.getAll()
    })
  )
)


const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REPLACE': 
    return state.map(el => (
      el.id === action.data?.id ? action.data
      : el
    ))
    case 'CREATE':
      return [...state, action.data]
    case 'DELETE':
      return state.filter(el => el.id !== action.data.id)
    case 'INIT':
      return action.data
    default:
      return state
  }
}


export default usersReducer