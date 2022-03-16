import {Card, Row, Col, Button} from 'react-bootstrap'

//등록된 award들
//AwardCard에서 편집버튼은 isEditable이 true여야 가능함
//편집 버튼을 클릭하면 isEditing이 true가 되도록 설정
function AwardCard({award, isEditable, setIsEditing}){

    

    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{award.title}</span>
                    <br />
                    <span className="text-muted">{award.description}</span>
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

export default AwardCard