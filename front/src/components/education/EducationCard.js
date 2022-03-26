import { Card, Col, Row} from 'react-bootstrap'
import Style from '../../App.module.css'

function EducationCard({removeEducation, education, setIsEditing, isEditable}) {
    return (
        <Card.Text>
                <Row className="align-items-center"
                    style={{paddingLeft: '28px'}}>
                    <Col className="mb-3">
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
                            className={Style.mvpEditButton}>
                                수정
                            </button>

                            <button
                            onClick={() => removeEducation()}
                            className={Style.mvpRemoveButton}>
                                삭제
                            </button>
                        </Col>
                    )}
                </Row>
        </Card.Text>
    )
}

export default EducationCard
