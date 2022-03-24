import {Card, Row, Col } from 'react-bootstrap'
import Style from '../../../App.module.css'

function CommentCard({comment, isEditable, setIsEditing, removeComment}){

    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{comment.hidden ? '익명' : comment.writer}</span>
                    <br />
                    <span className="text-muted">{comment.content}</span>
                </Col>

                <Col xs={2}>
                    {isEditable && (
                        <>
                            <button
                                onClick={() => setIsEditing((prev) => !prev)}
                                className={Style.mvpEditButton}>
                                    수정
                            </button>

                            <button
                                onClick={() => removeComment()}
                                className={Style.mvpRemoveButton}>
                                    삭제
                            </button>
                        </>
                    )}
                </Col>
            </Row>
        </Card.Text>
    )
}

export default CommentCard

