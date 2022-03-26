import React, { useState, useEffect, useReducer, createContext } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import * as Api from "./api"
import { userReducer } from "./reducer"

import Header from "./components/Header"
import LoginForm from "./components/user/LoginForm"
import Network from "./components/user/Network"
import RegisterForm from "./components/user/RegisterForm"
import Portfolio from "./components/Portfolio"
import Home from './components/Home'
import Footer from "./components/Footer"

export const UserStateContext = createContext(null)
export const DispatchContext = createContext(null)


function App() {
    // userReducer 훅을 통해 userState 상태와 userDispatch함수를 생성함.
    const [userState, userDispatch] = useReducer(userReducer, {
        user: null,
    });

    // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await Api.get("user/current");
            console.log(res.data)
            const currentUser = res.data;

            // userDispatch 함수를 통해 로그인 성공 상태로 만듦.
            userDispatch({
                type: "LOGIN_SUCCESS",
                payload: currentUser,
            });

            console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return "loading...";
    }

    return (
        <DispatchContext.Provider value={userDispatch}>
            <UserStateContext.Provider value={userState}>
                <Router >
                    <Header />
                    <Routes >
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
                </Router>

            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
