import { useNavigate } from "react-router-dom"
import { Card, Row, Button, Col } from "react-bootstrap"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { useState, useContext, useEffect, useCallback } from 'react'
import * as Api from "../../api"
import { UserStateContext } from '../../App'

function UserCard({ user, setIsEditing, isEditable, myID, isNetwork, setLoadUserlist, setReloadUser }) {
    const navigate = useNavigate()
    const userState = useContext(UserStateContext)

    const isNotMyProfileinHome_Mypage = userState.user?.id !== user?.id
    const isNotMyProfileinNetwork = myID !== user?.id

    // 현재 이 user가 팔로우된 상태인지 아닌지를 확인하는 상태값
    const [isFollowing, setIsFollowing] = useState(null)

    // 팔로우된 상태인지 아닌지를 확인해서 버튼을 바꿔주는 로직을 짜야함니다!!!
    const checkFollowing = async () => {
        //내 팔로잉 목록을 확인해서
        const myData = await Api.get('user', myID)
        const followingList = myData.data.following

        if(followingList.find((following) => following === user?.id)){
            // 현재 내가 팔로잉을 하고 있으면 isFollowing을 true로 설정하기
            setIsFollowing(true)
        }
        else{
            // 내가 팔로잉을 하고 있지 않고 있다면 isFollowing을 false로 설정하기
            setIsFollowing(false)
        }
    }

    // 왜 await 안붙여주면 Promise 객체가 반환될까?? -> 캡쳐사진 확인하기
    useEffect( () => {
        console.log("초기에 팔로우 상태를 확인합니다..")
        checkFollowing()
    }, [user?.id])

    const handleFollowing = useCallback( async (myID, yourID) => {
        try {
            const myData = await Api.get('user', myID)
            const followingList = myData.data.following
            console.log(followingList)
            console.log(isFollowing)
            const check = followingList.find((following) => following === yourID)
            if(check){
                // 현재 내가 팔로잉을 하고 있으면 isFollowing을 true로 설정하기
                console.log(user?.name, "팔로우 상태입니다")
            }
            else{
                // 내가 팔로잉을 하고 있지 않고 있다면 isFollowing을 false로 설정하기
                console.log(user?.name, "언팔로우 상태입니다")
            }
            console.log(check)
            //setIsFollowing('아무거나')
            console.log(isFollowing)
            // check가 true라면 팔로우된 상태이기 때문에 언팔로우로 만들어야 함
            if (check) {
                console.log("팔로우된 상태이기 때문에", isFollowing)
                const res = await Api.put(`user/follow/${myID}`, {userIdYour: yourID})
                setIsFollowing(false)
                alert("언팔로우 되었습니다!")
                
            }
            // check가 false라면 언팔로우된 상태이기 때문에 팔로우로 만들어야 함
            else {
                console.log("언팔로우된 상태이기 때문에", isFollowing)
                const res = await Api.put(`user/follow/${myID}`, { userIdYour: yourID })
                setIsFollowing(true)
                alert("팔로우 되었습니다!")
            }
            console.log(isFollowing)
            isNetwork ? (setLoadUserlist((prev) => !prev))
                    : (setReloadUser((prev) => !prev)) 
        } catch (error) {
            console.log(error)
            //alert(error.response.data)
        }
    }, [])

    return (
        <>
            <Card className="mt-4 mb-2 ms-3 mr-5" style={{ width: "18rem", margin: '0 auto' }}>
                <Card.Body>
                    <Row className="justify-content-md-center">
                        <Card.Img
                            style={{ width: "10rem", height: "8rem" }}
                            className="mb-3"
                            src={user?.imageName === "none" ? "https://21c-devs-bucket.s3.ap-northeast-2.amazonaws.com/20220324_85770005.png"
                                : `https://21c-devs-bucket.s3.ap-northeast-2.amazonaws.com/${user?.imageName}`} />
                    </Row>

                    <Card.Title>{user?.name}({user?.nickname})
                        <span className="ms-3">
                            {console.log(user?.name, isFollowing)}
                            {isNotMyProfileinHome_Mypage && isNotMyProfileinNetwork && (
                                <BsFillPersonPlusFill onClick={() => {
                                    handleFollowing(myID, user?.id)
                                }} style={{
                                    color: isFollowing ? 'blue' : 'black'
                                }}/>
                            )}

                        </span >
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
                    <Card.Text>{user?.description}</Card.Text>
                    <Card.Text>following {user?.followingCount} / follower {user?.followerCount}</Card.Text>

                    {isEditable && (
                        <Col className="mt-auto">
                            <Row className="mt-3 text-center text-info">
                                <Col sm={{ span: 20 }}>
                                    <Button style={{ 
                                    border:"solid 2px",
                                    borderRadius: '5px', 
                                    backgroundColor: '#e5d6ff'}} 
                                        onClick={() => setIsEditing(true)}
                                    >
                                        편집
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    )}
                </Card.Body>
                
                {isNetwork && (
                    <Button
                        className="mt-auto mb-2"
                        href="#"
                        onClick={() => navigate(`/user/${user.id}`)}
                        style={{
                            margin: 'auto',
                            border: "solid 2px",
                            borderRadius: '5px',
                            backgroundColor: '#e5d6ff'
                        }}>
                        포트폴리오
                    </Button>
                )}
            </Card>

        
        </>
    )
}

export default UserCard
