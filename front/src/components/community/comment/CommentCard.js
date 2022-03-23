import {Card, Row, Col, Button} from 'react-bootstrap'


function CommentCard({comment, isEditable, setIsEditing, ownerId}){
    const user_id = ownerId

    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{user_id}</span>
                    <br />
                    <span className="text-muted">{comment.description}</span>
                </Col>
                {isEditable && (
                    <Col xs lg="1">
                        <Button
                            variant="outline-info"
                            onClick={() => setIsEditing(true)}
                            size="sm"
                            className="mr-3"
                            >
                            편집
                        </Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    )
}

export default CommentCard

