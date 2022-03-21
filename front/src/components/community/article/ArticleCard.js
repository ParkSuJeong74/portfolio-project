import { Col, Row,Card,Button } from "react-bootstrap";

function ArticleCard({article, isEditable, setIsEditing, owner}){
    {/*상세내용*/}
    return(
        
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{article.title}</span>
                    <br />
                    <span className="text-muted">{article.body}</span>
                    <br />
                    <span className="text-muted">작성자: {owner.name}</span>
                </Col>
                {isEditable && (
                    <Col>
                        <Button onClick={() => setIsEditing(true)}>수정</Button>
                        <Button>삭제</Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    )
}

export default ArticleCard