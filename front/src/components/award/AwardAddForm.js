import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Style from '../../App.module.css'

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAward = await Api.post("award/create", {
            userId: portfolioOwnerId,
            title,
            description,
        });

        setAwards((prev) => [...prev, newAward.data])

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
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
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
                        className={Style.mvpConfirmButton}>
                        확인
                    </button>

                    <button
                        onClick={() => setIsAdding(false)}
                        className={Style.mvpCancelButton}>
                        취소
                    </button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default AwardAddForm;
