import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { UserStateContext, DispatchContext } from "../App"
import '../App.css'
import * as Api from '../api.js'

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

    async function withdraw(){
        const user_id = userState.user?.id
        console.log('user_id는', user_id)
        await Api.delete(`users/${user_id}`)

        console.log('회원이 탈퇴되었습니다.')

        // 로그인 페이지로 이동함.
        navigate("/login");
    }

    const naviagationInformations = [
        {title: '마이페이지', link: '/'},
        {title: '유저리스트', link: '/userlist'},
    ]

    return (

        <div className="navBar">
            <div style= {{fontSize: '2.5em', fontFamily: 'Rosarivo'}}>MY PORTFOLIO</div>
            <ul style={{ gap: 30 }} className="navItems">
                {naviagationInformations.map((navigationItem) => (
                    <li
                        onClick={() => {
                            navigate(navigationItem.link)
                        }}
                        className="navItem"
                    >{navigationItem.title}
                    </li>
                ))}
                
                {isLogin && (
                    <li onClick={logout}
                        className = "navItem"> 로그아웃</li>
                    
                )}
                {isLogin && (
                    <li onClick={withdraw}
                        className = "navWithdraw">탈퇴</li>
                )}
            </ul>
        </div>

    );

}

export default Header;
