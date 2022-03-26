import React, { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { UserStateContext, DispatchContext } from "../App"
import * as Api from '../api.js'
import Style from '../App.module.css'
import WithdrawModal from "./WithdrawModal"

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const userState = useContext(UserStateContext)
    const userDispatch = useContext(DispatchContext)

    // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
    const isLogin = !!userState.user;

    // 로그아웃 클릭 시 실행되는 함수
    const logout = () => {
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem("userToken");
        // userDispatch 함수를 이용해 로그아웃함.
        userDispatch({ type: "LOGOUT" });
    };

    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const naviagationInformations = [
        {title: 'HOME', link: '/'},
        {title: '마이페이지', link: '/portfolio'},
        {title: '유저리스트', link: '/userlist'},
    ]

    return (
    <>
        <div className={Style.navBar}>
            <div className={Style.Title} style= {{fontSize: '2.5em'}}>MY PORTFOLIO</div>
            <ul style={{ gap: 30 }} className={Style.navItems}>
                {naviagationInformations.map((navigationItem) => (
                    <li
                        onClick={() => {
                            navigate(navigationItem.link)
                        }}
                        className={Style.navItem}
                    >{navigationItem.title}
                    </li>
                ))}
                
                {isLogin && (
                    <li onClick={logout}
                        className = {Style.navItem}> 로그아웃</li>
                    
                )}
                {isLogin && (
                    <li onClick={handleShow}
                        className = {Style.navWithdraw}>탈퇴</li>
                )}
            </ul>
        </div>
        <WithdrawModal show={show} handleClose={handleClose}/>
    </>

    );

}

export default Header;
