import loginService from '../services/login.js'
import blogService from '../services/blogs.js'


const initialState = null

export const login = (username, password) => (
  async dispatch => {
    const user = await loginService.login({username, password})
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SET',
      data: user
    })
  }
)

export const set = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'SET',
    data: user
}}

export const logout = () => (
  async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'UNSET'
    })
  }
)


const loginReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'SET':
        return action.data
      case 'UNSET':
        return null
      default:
        return state
  }
}

export default loginReducer