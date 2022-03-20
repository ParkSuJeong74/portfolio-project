import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";

function CommentAddForm({ ownerId, setComments, setIsAdding }) {
    
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ownerId를 user_id 변수에 할당함.
    const user_id = ownerId;

    // "comment/create" 엔드포인트로 post요청함.
    await Api.post("comment/create", {
        user_id: ownerId,
        description
    });

    // "commentlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("commentlist", user_id);
    // comments를 response의 data로 세팅함.
    setComments(res.data);
    // comment를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
    };

    return (
    
    <>
        <div>{user_id}</div>
    
    
    
        <Form onSubmit={handleSubmit}>
        

            <Form.Group controlId="formBasicDescription" className="mt-3">
            <Form.Control
                type="text"
                placeholder="댓글 내용"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" className="me-3">
                등록
                </Button>
                <Button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
                </Button>
            </Col>
            </Form.Group>
        </Form>
    </>
    );
}

export default CommentAddForm;
