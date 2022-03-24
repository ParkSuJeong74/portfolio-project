import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
 


function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
    const navigate = useNavigate();
    return (
        <Card className="mt-4 mb-2 ms-3 mr-5" style={{ width: "18rem", margin: '0 auto', backgroundColor: '#FCFAFA' }}>
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Card.Img
                        style={{ width: "10rem", height: "8rem" }}
                        className="mb-3"
                        src="http://placekitten.com/200/200"
                        alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
                    />
                </Row>


                    <Card.Title>{user?.name}</Card.Title>
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
