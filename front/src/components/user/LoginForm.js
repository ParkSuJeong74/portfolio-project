import  { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
// import { Container, Col, Row, Form, Button } from "react-bootstrap"

import * as Api from "../../api"
import { login } from "../../redux/action/userAction"

import PasswordChangeModal from "./PasswordChangeModal"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="localhost:3000">
        PUPA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }

  const isEmailValid = validateEmail(email)
  const isPasswordValid = password.length >= 4

  // const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await Api.post("user/login", {
        email,
        password,
      })
      const user = res.data
      const jwtToken = user.token
      sessionStorage.setItem("userToken", jwtToken)

      dispatch(login(user))
      navigate("/", { replace: true })
    } catch (error) {
      alert(error.response.data)
    }
  }

  const [isModalActive, setIsModalActive] = useState(false)

  const handleModalClose = () => setIsModalActive(false)
  const handleModalShow = () => setIsModalActive(true)


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#08075C' }}>
              <img src={process.env.PUBLIC_URL + '/only_butterflies.png'} style={{width: '80px', height: '40px'}} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor: '#08075C'}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={()=>{ handleModalShow()}} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={()=>navigate("/register")} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>

      {isModalActive && (
        <PasswordChangeModal
          onConfirm={handleModalClose}
          onCancel={handleModalClose}
        />
      )}
    </>
  )
}

export default LoginForm
