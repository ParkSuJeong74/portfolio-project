import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);

    //현재 로그인한 자기 아이디
    const myID = userState.user?.id

    
    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate("/login");
            return;
        }

        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        // * 유저 리스트에서 자신은 빼도록 했음
        Api.get("user/list").then((res) => {
            const userArray = res.data

            const notMYuserArray = userArray.filter((user) => user.id !== myID)

            setUsers(notMYuserArray)
        });
    }, [userState, navigate]);

    return (
        <Container fluid>
            <Row xs="auto" className="jusify-content-center"
                style={{
                    marginTop: '30px'
                }}>
            {users.map((user) => (
                <UserCard 
                    key={user.id} 
                    user={user} 
                    myID={myID}
                    
                    isNetwork />
            ))}
            </Row>
        </Container>
    );
}

export default Network;
