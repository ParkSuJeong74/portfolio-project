import { useNavigate } from "react-router-dom"
import { Card, Row, Button, Col } from "react-bootstrap"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { useState, useContext, useEffect } from "react"
import * as Api from "../../api"
import { UserStateContext } from "../../App"
import { IconButton } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"

function UserCard({
    user,
    setIsEditing,
    isEditable,
    myID,
    isNetwork,
    setReloadUserlist,
    setReloadUser,
}) {
    const navigate = useNavigate()
    const userState = useContext(UserStateContext)

    const isNotMyProfileinHome_Mypage = userState.user?.id !== user?.id
    const isNotMyProfileinNetwork = myID !== user?.id

    // 현재 이 user가 팔로우된 상태인지 아닌지를 확인하는 상태값
    const [isFollowing, setIsFollowing] = useState(null)

    const [targetUser, setTargetUser] = useState(null)

    // 왜 await 안붙여주면 Promise 객체가 반환될까?? -> 캡쳐사진 확인하기
    useEffect(() => {
        // 초기에 팔로우 상태를 확인
        checkFollowing()
    }, [user?.id])

    // 팔로우된 상태인지 아닌지를 확인
    const checkFollowing = async () => {
        const myData = await Api.get("user", myID)
        const followingList = myData.data.following
        const targetUser = followingList.find(
            (following) => following === user?.id
        )
        //findTargetUser(user?.id)
        if (targetUser) {
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    }

    const findTargetUser = async (id) => {
        const myData = await Api.get("user", myID)
        const followingList = myData.data.following
        const target = followingList.find((following) => following === id)
        setTargetUser(target)
    }

    const handleFollowing = async (myID, yourID) => {
        try {
            const myData = await Api.get("user", myID)
            const followingList = myData.data.following
            const targetUser = followingList.find(
                (following) => following === yourID
            )
            //findTargetUser(yourID)
            await Api.put(`user/follow/${myID}`, {
                userIdYour: yourID,
            })

            if (targetUser) {
                setIsFollowing(false)
                alert("언팔로우 되었습니다!")
            } else {
                setIsFollowing(true)
                alert("팔로우 되었습니다!")
            }

            // 네트워크 페이지라면 userlist를 다시 로드, 개인 포트폴리오 페이지라면 user를 다시 로드함
            isNetwork
                ? setReloadUserlist((prev) => !prev)
                : setReloadUser((prev) => !prev)
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <>
            <Card
                className="mt-4 mb-2 ms-3 mr-5"
                style={{ width: "18rem", margin: "0 auto" }}
            >
                <Card.Body>
                    <Row className="justify-content-md-center">
                        <Card.Img
                            style={{ width: "10rem", height: "8rem" }}
                            className="mb-3"
                            src={
                                user?.imageName === "none"
                                    ? "https://21c-devs-bucket.s3.ap-northeast-2.amazonaws.com/20220324_85770005.png"
                                    : `https://21c-devs-bucket.s3.ap-northeast-2.amazonaws.com/${user?.imageName}`
                            }
                        />
                    </Row>

                    <Card.Title>
                        {user?.name}({user?.nickname})
                        <span className="ms-1">
                            {console.log(user?.name, isFollowing)}
                            {isNotMyProfileinHome_Mypage &&
                                isNotMyProfileinNetwork && (
                                    <>
                                        <IconButton size="medium">
                                            <GroupAddIcon
                                                fontSize="inherit"
                                                onClick={() => {
                                                    handleFollowing(
                                                        myID,
                                                        user?.id
                                                    )
                                                }}
                                                style={{
                                                    color: isFollowing
                                                        ? "#514FD6"
                                                        : "lightgray",
                                                }}
                                            />
                                        </IconButton>
                                    </>
                                )}
                        </span>
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                        {" "}
                        {user?.email}
                    </Card.Subtitle>
                    <Card.Text>{user?.description}</Card.Text>
                    <Card.Text>
                        {" "}
                        following {user?.followingCount} / follower{" "}
                        {user?.followerCount}{" "}
                    </Card.Text>

                    {isEditable && (
                        <Col className="mt-auto">
                            <Row className="mt-3 text-center text-info">
                                <Col sm={{ span: 20 }}>
                                    <Button
                                        style={{
                                            border: "solid 2px",
                                            borderRadius: "5px",
                                            backgroundColor: "#e5d6ff",
                                        }}
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
                            margin: "auto",
                            border: "solid 2px",
                            borderRadius: "5px",
                            backgroundColor: "#e5d6ff",
                        }}
                    >
                        포트폴리오
                    </Button>
                )}
            </Card>
        </>
    )
}

export default UserCard
