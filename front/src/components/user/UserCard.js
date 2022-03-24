import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import {useState, useContext} from 'react'
import {UserStateContext} from '../../App'
import * as Api from "../../api";
 


function UserCard({ user, setIsEditing, isEditable, isNetwork, basic, image}) {
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(false)
    const userState = useContext(UserStateContext)
    const followFollowing = async (userId, userId2) => {

        try {
            await Api.post(`/following/${userState.id}/${user.id}`) 
        }  catch (err) {
            console.error(err)
        }
        
    }
    return (
        <Card className="mt-4 mb-2 ms-3 mr-5" style={{ width: "18rem", margin: '0 auto', backgroundColor: '#FCFAFA' }}>
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img
                        style={{ width: "10rem", height: "8rem" }}
                        className="mb-3"
                        src={basic ? "https://21c-devs-bucket.s3.ap-northeast-2.amazonaws.com/20220324_85770005.png"
                        : `https://${process.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${image}`}

                        
                    />
                </Row>
                    

                    <Card.Title>{user?.name}({user?.nickname}) <span className="ms-3" onClick={() =>{followFollowing()
                    setIsSelected((prev)=>(!prev))}}>
                     {/* {userState.user === user.id ? } */}
                    {isSelected ? <BsFillPersonXFill/>: <BsFillPersonPlusFill/>}
                        
                    </span ></Card.Title>

                    
                    
                    <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
                    <Card.Text>{user?.description}</Card.Text>



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
                        onClick={() => navigate(`/users/${user.id}`)}
                        style={{
                            margin: 'auto',  
                            border:"solid 2px",
                            borderRadius: '5px', 
                            backgroundColor: '#e5d6ff'
                                    
                            }}
                    >
                    포트폴리오
                    </Button>
                )}



            </Card>
            
        


    );
}

export default UserCard;
