import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import '../../App.css'

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
    //useState로 title 상태를 생성함.
    const [title, setTitle] = useState("");
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // portfolioOwnerId를 user_id 변수에 할당함.
        const user_id = portfolioOwnerId;

        // "award/create" 엔드포인트로 post요청함.
        await Api.post("award/create", {
            user_id: portfolioOwnerId,
            title,
            description,
    });

    // "awardlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", user_id);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
    };

    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
        <Form.Control
            type="text"
            placeholder="수상내역"
            value={title}
            style={{ 
                width: 'auto',
                border: 'solid 2px #DBC7FF'
            }}
            onChange={(e) => setTitle(e.target.value)}
        />
        </Form.Group>

        <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            style={{
                border: 'solid 2px #DBC7FF'
            }}
            onChange={(e) => setDescription(e.target.value)}
        />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>

            <button
                type="submit"
                className="mvpConfirmButton me-3">
                확인
            </button>

            <button
                onClick={() => setIsAdding(false)}
                className="mvpCancelButton">
                취소
            </button>
        </Col>
        </Form.Group>
    </Form>
    );
}

export default AwardAddForm;
