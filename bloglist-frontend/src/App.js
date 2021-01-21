import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom"

import { AppBar, Box, Button, Container, Toolbar, Typography as T} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import BlogAddForm from './components/BlogAddForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Tooglable from './components/Tooglable'
import UserList from './components/UserList'
import { Notification } from './components/Notification'

import {
  set as setUser,
  logout
} from './reducers/loginReducer'
import UserView from './components/UserView'
import BlogView from './components/BlogView'


const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      console.log('no user saved in storage');
      const user = JSON.parse(loggedUserJSON)
      console.log(`Setting token: '${user.token}'`)
      dispatch(setUser(user))
    }
    else {
      console.log('no user saved in storage');
    }
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('Logging out..')
    dispatch(logout())
  }

  const addBlogFormRef = useRef()

  return (
    <ThemeProvider>
      <Container>
        <Notification timeout={5000}/>
        {(loggedUser === null || loggedUser === undefined)
          ? // No logged user
          ( 
            <LoginForm id='login-form' />
          )
          : // With logged user
          (
            <>
            <header>
              <div style={{flexGrow: 1}}>
                <AppBar position="static">
                  <Toolbar>
                    <Link to='/'><T v='h6' style={{marginRight: 0.5 + 'em', color: 'white'}}>BlogList</T></Link>
                    <Link to='/users'><T v='h6' style={{marginRight: 0.5 + 'em', color: 'white'}}>Users</T></Link>
                    <div style={{flexGrow: 1}}></div>
                    
                    <T v='p' style={{marginRight: 1 + 'em'}}>{loggedUser.name} logged-in</T>
                    <Button variant="contained" onClick={handleLogout}>Logout</Button>
                  </Toolbar>
                </AppBar>
              </div>
            </header>
              
              <Switch>
                <Route path='/blogs/:id'>
                  <BlogView blogMatch={blogMatch} />
                </Route>
                <Route path='/users/:id'>
                  <UserView userMatch={userMatch} />
                </Route>
                <Route path='/users'>
                <UserList />
                </Route>
                <Route path='/'>
                  <div>
                  <Tooglable id="toogle-blog-add-form" buttonLabel="Add blog" ref={addBlogFormRef}>
                    <BlogAddForm
                      id="blog-add-form"
                      toogleRef={addBlogFormRef}
                    />
                  </Tooglable>
                  <T v="h2">blogs</T>
                  <BlogList />
                </div>
                </Route>
              </Switch>
            </>
          )}
      </ Container>
    </ ThemeProvider>
  )
}

export default App