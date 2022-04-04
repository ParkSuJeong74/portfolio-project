import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserStateContext, DispatchContext } from "../App"
import Style from "../App.module.css"
import WithdrawModal from "./WithdrawModal"

function Header() {
  const navigate = useNavigate()

  const userState = useContext(UserStateContext)
  const userDispatch = useContext(DispatchContext)

  const isLogin = !!userState.user

  const logout = () => {
    sessionStorage.removeItem("userToken")
    userDispatch({ type: "LOGOUT" })
    navigate("/")
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const naviagationInformations = [
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
          {naviagationInformations.map((navigationItem) => (
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
            <li onClick={logout} className={Style.navItem}>
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
