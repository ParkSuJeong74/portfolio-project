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

    //로그인한 myID가 팔로우할 yourID
    const [yourID, setYourID] = useState('')
    console.log('myID', myID)
    console.log('yourID', yourID)

    //이미 내가 팔로우한 상대인지 확인하는 상태값
    const [isfollowing, setIsFollowing] = useState(true)

    //클릭한 yourID 정보에서 follower 목록을 확인해서 내 id를 찾아봐서 이미 내가 팔로우한 적이 있는지 상태설정하기...
    async function check(){
        try{
            await Api.get('user', yourID).then((res) => {
                console.log('res.data하면?', res.data)
                console.log('체크시작')
                const yourData = res.data
                //내가 이전에 팔로우한 적이 있다면, 그사람의 follower목록에 내 id가 있을 것이다
                const check = yourData.follower.find((follower) => follower === myID)
                check ? setIsFollowing(true) : setIsFollowing(false)
                console.log('체크완료')
            })
        } catch(err){
            console.log(err)
        }
    }
    check()

    // 내가 팔로우 안했을 때만 팔로우 가능!
    if(!isfollowing){
        async function following(){
            try{
                console.log('팔로우시작')
                await Api.put(`user/follow/${myID}`, {
                    userIdYour: yourID
                })
                console.log('팔로우완료')
            } catch(err){
                console.log(err)
            }
        }
        following()
    }
    
    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate("/login");
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get("user/list").then((res) => setUsers(res.data));
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
                    yourID={yourID}
                    setYourID={setYourID}
                    isfollowing={isfollowing}
                    isNetwork />
            ))}
            </Row>
        </Container>
    );
}

export default Network;
