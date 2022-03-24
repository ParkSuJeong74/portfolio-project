import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import Style from '../../../App.module.css'

function CommentAddForm({ owner, comments, dispatch, setIsAdding }) {
    
    const [content, setContent] = useState("");

    //* 익명버튼 상태
    const [hidden, setHidden] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Api post 요청하기!
        // owner(로그인한 사용자)의 id를 user_id 변수에 할당함.
        //const user_id = owner.id
        // "comment/create" 엔드포인트로 post요청함.
        /* await Api.post("comment/create", {
            user_id,
            content,
            hidden
        }); */

        dispatch({
            type: 'ADD',
            payload: { 
                writer: owner.name, content, hidden 
            }
        })

        setIsAdding(false);
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
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
