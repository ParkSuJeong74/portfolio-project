import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/action/userAction"

import Style from "../App.module.css"
import WithdrawModal from "./WithdrawModal"

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userState = useSelector((state) => state.user)

  const [show, setShow] = useState(false)

  const isLogin = !!userState.user

  const logoutHandler = () => {
    sessionStorage.removeItem("userToken")
    dispatch(logout(userState))
    navigate("/")
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navInfos = [
    { title: "HOME", link: "/" },
    { title: "마이페이지", link: "/portfolio" },
    { title: "유저리스트", link: "/userlist" },
  ]

  return (
    <>
      <div className={Style.navBar}>
        <div className={Style.Title} style={{ fontSize: "2.5em" }}>
          ˚｡.⋆｡ MY PORTFOLIO˚｡⋆.˚☽˚｡
        </div>
        <ul style={{ gap: 30 }} className={Style.navItems}>
          {navInfos.map((navigationItem) => (
            <li
              onClick={() => {
                navigate(navigationItem.link)
              }}
              className={Style.navItem}
            >
              {navigationItem.title}
            </li>
          ))}

          {isLogin && (
            <li onClick={logoutHandler} className={Style.navItem}>
              {" "}
              로그아웃
            </li>
          )}
          {isLogin && (
            <li onClick={handleShow} className={Style.navWithdraw}>
              탈퇴
            </li>
          )}
        </ul>
      </div>

      <WithdrawModal show={show} handleClose={handleClose} />
    </>
  )
}

export default Header
