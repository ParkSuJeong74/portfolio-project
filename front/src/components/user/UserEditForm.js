import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser, setImage, setBasic, image }) {
    //useState로 name 상태를 생성함.
    const name = user.name;
    //useState로 email 상태를 생성함.
    const email = user.email;

    const [nickname, setNickname] = useState(user.nickname)
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(user.description);
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // "users/유저id" 엔드포인트로 PUT 요청함.
        const res = await Api.put(`users/${user.id}`, {
            name,
            nickname,
            email,
            description,
            image
        });
        // 유저 정보는 response의 data임.
        const updatedUser = res.data;
        // 해당 유저 정보로 user을 세팅함.
        setUser(updatedUser);

        // isEditing을 false로 세팅함.
        setIsEditing(false);
    };
    

    return (
    <Card className="mb-2" style={{backgroundColor:'#FCFAFA'}}>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="useEditName" className="mb-3">
                    <Form.Control
                        disabled
                        type="text"
                        placeholder="이름"
                        value={name}
                        
                        style={{border: 'solid 2px #e5d6ff'}}
                    />
                </Form.Group>

                <Form.Group controlId="userEditEmail" className="mb-3">
                    <Form.Control
                        disabled
                        type="email"
                        placeholder="이메일"
                        value={email}
                        
                        style={{border: 'solid 2px #e5d6ff'}}
                    />
                </Form.Group>

                <Form.Group controlId="userEditNickname">
                    <Form.Control
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        style={{border: 'solid 2px #e5d6ff'}}
                    />
                </Form.Group>

                <Form.Group controlId="userEditDescription">
                    <Form.Control
                        type="text"
                        placeholder="설명"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{border: 'solid 2px #e5d6ff'}}
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <input 
                        style={{marginTop: 5}} 
                        type="file" 
                        name="attachment"
                        
                        onChange={(e) => {
                            console.log(e.target.files)
                            setImage(e.target.files[0])
                            setBasic(false)
                        }}></input>
                    </Col>
                    <Col>
                        <Button 
                        className="mt-2" 
                        style={{backgroundColor: "#e5d6ff", border:"solid 2px"}}
                        onClick={()=> setBasic(true)}
                        >기본이미지</Button>
                    </Col>    
                </Row>
                
                <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                        <Button variant="primary" type="submit" className="me-3" style={{backgroundColor: "#e5d6ff", border:"solid 2px"}}>
                        확인
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        취소
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Card.Body>
    </Card>
    );
}

export default UserEditForm;
