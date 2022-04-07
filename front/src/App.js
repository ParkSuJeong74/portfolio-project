import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import * as Api from "./api"

import { login } from "./redux/action/userAction"

import Header from "./components/Header"
import LoginForm from "./components/user/LoginForm"
import Network from "./components/user/Network"
import RegisterForm from "./components/user/RegisterForm"
import Portfolio from "./components/Portfolio"
import Home from "./components/Home"
import Footer from "./components/Footer"

import Style from "./App.module.css"

function App() {
  const dispatch = useDispatch()

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("user/current")
      const currentUser = res.data

      dispatch(login(currentUser))

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;")
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  if (!isFetchCompleted) {
    return "loading..."
  }

  return (
    <Router>
      <div className={Style.mainWrapper}>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:categoryId" exact element={<Home />} />
          <Route path="/:categoryId/:articleName" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user/:userId" element={<Portfolio />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/userlist" element={<Network />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App