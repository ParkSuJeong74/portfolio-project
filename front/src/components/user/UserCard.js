import { useNavigate } from "react-router-dom"
import { Card, Row, Button, Col } from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
import * as Api from "../../api"
import { UserStateContext } from "../../App"
import { IconButton } from "@mui/material"
import GroupAddIcon from "@mui/icons-material/GroupAdd"

function UserCard({
    user,
    setIsEditing,
    isEditable,
    loginUserId,
    isNetwork,
    setReloadUserlist,
    setReloadUser,
}) {
    const navigate = useNavigate()
    const userState = useContext(UserStateContext)

    const isNotMyProfileinHome_Mypage = userState.user?.id !== user?.id
    const isNotMyProfileinNetwork = loginUserId !== user?.id

    // 현재 내가 이 user를 팔로우하고 있는지 아닌지를 확인하는 상태값
    const [isFollowing, setIsFollowing] = useState(null)

    useEffect(() => {
        // 초기에 팔로우 상태를 확인
        checkFollowing()
    }, [user?.id])

    // 팔로우한 상태인지를 확인해서 상태를 설정
    const checkFollowing = async () => {
        const targetUser = await findTargetUser(user?.id)
        if (targetUser) {
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    }

    // 클릭한 해당 user가 현재 내 follower목록에 있는지 확인
    async function findTargetUser(id) {
        const myData = await Api.get("user", loginUserId)
        const followingList = myData.data.following
        const target = followingList.find((following) => following === id)
        return target
    }

    const handleFollowing = async (myID, yourID) => {
        try {
            const targetUser = await findTargetUser(yourID)
            await Api.put(`user/follow/${myID}`, {
                userIdYour: yourID,
            })
            //follower 목록에 있으면 언팔로우, 없으면 팔로우
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
                            {isNotMyProfileinHome_Mypage &&
                                isNotMyProfileinNetwork && (
                                    <>
                                        <IconButton size="medium">
                                            <GroupAddIcon
                                                fontSize="inherit"
                                                onClick={() => {
                                                    handleFollowing(
                                                        loginUserId,
                                                        user?.id
                                                    )
                                                }}
                                                style={{
                                                    color: isFollowing
                                                        ? "#4644B8"
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
