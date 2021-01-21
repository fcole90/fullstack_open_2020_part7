import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
// import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'


const store = createStore(
  combineReducers({
    blogs: blogsReducer,
    login: loginReducer,
    users: usersReducer,
    // notification: notificationReducer,
    // filter: filterReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// store.subscribe(() => console.log(store.getState()))
store.subscribe(() => null)

export default store