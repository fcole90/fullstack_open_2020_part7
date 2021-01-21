import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography as T} from '@material-ui/core';

import { login as userLogin } from '../reducers/loginReducer'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const LoginForm = ({ login, id }) => {
  const username = {...useField('text')}
  const password = {...useField('password')}
  const classes = useStyles();

  const handleLogin = (event) => {
    event.preventDefault()
    login(
      username.value,
      password.value
    )
  }

  return (<div id={id}>
    <T v='h2'>Log in to application</T>
    <form className={classes.root} onSubmit={handleLogin}>
      {/* <div> */}
      <FormControl margin='2em'>
        <InputLabel htmlFor="input-with-icon-adornment">username</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          className='username'
          name="Username"
          {...username}
        />
      </FormControl>
      <FormControl margin='2em'>
        <InputLabel htmlFor="input-with-icon-adornment">password</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon />
            </InputAdornment>
          }
          className='password'
          name="Password"
          {...password}
        />
      </FormControl>
      <Button  variant="contained" color="primary" className='submit' type="submit" onClick={handleLogin}>login</Button>
    </form>
  </div>)
}

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    dispatch(userLogin(username, password))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)