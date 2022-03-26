import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import { useState, useContext } from 'react'
import * as Api from "../../api";
import UnfollowModal from "./UnfollowModal";
import { UserStateContext } from '../../App'
// import * as userDefaultImage from "./user_Default_Image.png"

function UserCard({ user, setIsEditing, isEditable, myID, isNetwork }) {
    const navigate = useNavigate()
    const userState = useContext(UserStateContext);
    //Home이랑 Mypage 상에서는 팔로우 버튼 안보이게 하기
    const isNotMyProfileinHome_Mypage = userState.user?.id !== user?.id
    //Network 상에서 자신의 프로필이라면 팔로우 버튼 안보이게 하기
    const isNotMyProfileinNetwork = myID !== user?.id

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log("user: ", user)

    // useEffect(() => {

    // }, [])

    const followFollowing = async (myID, yourID) => {
        try {
            const check = await Api.get('user', yourID)
            //선택한 유저가 내가 이미 팔로우한 사람인지 여부, true -> '팔로우한 상태', false -> '팔로우 안한 상태'
            const isfollowed = check.data.follower.find((follower) => follower === myID)
            const currentFollow = isfollowed ? ('팔로우한 상태입니다.') : ('팔로우한 상태가 아닙니다.')
            console.log(currentFollow)
            //팔로우 안한 상태가 맞으면 팔로우 시작하기!
            if (!isfollowed) {
                const res = await Api.put(`user/follow/${myID}`, { userIdYour: yourID })
                alert("팔로우되었습니다!")
                console.log(res)
            }
            else {
                handleShow()
            }
        } catch (error) {
            alert(error.response.data)
        }
    }

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

                            {isNotMyProfileinHome_Mypage && isNotMyProfileinNetwork && (
                                <BsFillPersonPlusFill onClick={() => {
                                    followFollowing(myID, user?.id)
                                }} />
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
                                        border: "solid 2px",
                                        borderRadius: '5px',
                                        backgroundColor: '#e5d6ff'
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
                            margin: 'auto',
                            border: "solid 2px",
                            borderRadius: '5px',
                            backgroundColor: '#e5d6ff'
                        }}
                    >
                        포트폴리오
                    </Button>
                )}
            </Card>

            <UnfollowModal handleClose={handleClose} show={show}
                myID={myID} yourID={user?.id} />
        </>

    );
}

export default UserCard;
