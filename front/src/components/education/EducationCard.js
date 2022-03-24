import { Card, Col, Row} from 'react-bootstrap'
import '../../App.css'


function AwardCard({education, setIsEditing, isEditable, setIsRemoving}) {
    return (
        <Card.Text>
                <Row className="align-items-center"
                    style={{paddingLeft: '28px'}}>
                    <Col>
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                        }}>{education.school}</span>
                        <br />
                        <span className='text-muted'>{education.major} ({education.position})</span>
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