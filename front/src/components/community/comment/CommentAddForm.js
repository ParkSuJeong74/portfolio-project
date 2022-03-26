import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import Style from '../../../App.module.css'

function CommentAddForm({ owner, comments, dispatch, setIsAdding, article }) {
    
    const [comment, setComment] = useState("");

    const [hidden, setHidden] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Api post 요청하기!
        try {
            await Api.post(`comment/create`, {
                userId: owner.id,
                articleId: article.id,
                writerId: owner.id,
                comment: comment,
                hidden: hidden
            })

            dispatch({
                type: 'ADD',
                payload: { 
                    writerId: owner.id, writerName: owner.name, comment, hidden 
                }
            })
    
            setIsAdding(false);
        } catch (error) {
            alert(error.response.data)
        }
    };

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Check 
                type="checkbox"
                label= "익명"
                checked = {hidden}
                onChange={() => setHidden((prev) => !prev)} />
        
            <Form.Group controlId="formBasicContent" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="댓글 내용"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <button
                        type="submit"
                        className={[Style.confirmButton, Style.communityAddButton].join(' ')}>
                        확인
                    </button>

                    <button
                        onClick={() => setIsAdding(false)}
                        className={Style.cancelButton}>
                        취소
                    </button>
                </Col>
            </Form.Group>

        </Form>
    );
}

export default CommentAddForm;
