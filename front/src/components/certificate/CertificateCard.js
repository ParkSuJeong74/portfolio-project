import {Card, Button, Col,Row } from 'react-bootstrap'
import '../../App.css'

function CertificateCard({isEditable, setIsEditing, certificate, setIsRemoving}){
    return (
        <Card.Text>
            <Row className="align-items-center"
                style={{paddingLeft: '28px'}}>
                <Col>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}>{certificate.title}</span>
                    <br />
                    <span className="text-muted">{certificate.description}</span>
                    <br />
                    <span className="text-muted">{certificate.when_date}</span>
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
export default CertificateCard