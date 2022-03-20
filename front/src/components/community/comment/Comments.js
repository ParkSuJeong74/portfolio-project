import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../../api";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";

function Comments({ ownerId, isEditable }) {
  //useState로 comments 상태를 생성함.
    const [comments, setComments] = useState([]);
    //useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
    
    Api.get("commentlist", ownerId).then((res) => setComments(res.data));
    }, [ownerId]);

    return (
    <Card>
        <Card.Body>
        <Card.Title>댓글</Card.Title>

        

        {comments.map((comment) => (
            <Comment
                key={comment.id}
                commnet={comment}
                setComments={setComments}
                isEditable={isEditable}
            />
        ))}

        // 로그인했을 때 댓글 추가/수정을 할 수 있음 

        {isLogin && (
            <Row className="text-center">
            <Col>
                <Button onClick={() => setIsAdding(true)}>추가</Button>
            </Col>
            </Row> 
        )}

        {isLogin && (
            <Row className="text-center">
            <Col>
                <Button onClick={() => setIsEditable(true)}>수정</Button>
            </Col>
            </Row> 
        )}




        {isEditable && (
            <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
            </Row>
        )}
        {isAdding && (
            <CommentAddForm 
                portfolioOwnerId={ownerId}
                setIsAdding={setIsAdding}
                setComments={setComments}/>
        )}

        </Card.Body>
    </Card>
    )
}

export default Comments