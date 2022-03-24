import {Card, Row, Col, Button} from 'react-bootstrap'
import '../../App.css'

//등록된 award들
//AwardCard에서 편집버튼은 isEditable이 true여야 가능함
//편집 버튼을 클릭하면 isEditing이 true가 되도록 설정
function AwardCard({award, isEditable, setIsEditing, setIsRemoving}){

    return (
        <Card.Text>
            <Row className="align-items-center"
                style={{paddingLeft: '28px'}}>
                <Col>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}>{award.title}</span>
                    <br />
                    <span className="text-muted">{award.description}</span>
                </Col>
                {isEditable && (
                    <Col xs={2}>
                        <button
                            onClick={() => setIsEditing((prev) => !prev)}
                            className="mvpEditButton">
                                수정
                        </button>

                        <button
                            onClick={() => setIsRemoving((prev) => !prev)}
                            className="mvpRemoveButton">
                                삭제
                        </button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    )
}

export default AwardCard

