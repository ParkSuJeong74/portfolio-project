import {Card, Button, Col,Row } from 'react-bootstrap'
import Style from '../../App.module.css'

function CertificateCard({isEditable, setIsEditing, certificate, removeCertificate}){
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
                    <span className="text-muted">{certificate.whenDate}</span>
                </Col>
                {isEditable && (
                    <Col xs={2}>

                        <button
                            onClick={() => setIsEditing((prev) => !prev)}
                            className={Style.mvpEditButton}>
                            수정
                        </button>

                        <button
                            onClick={() => removeCertificate()}
                            className={Style.mvpRemoveButton}>
                            삭제
                        </button>

                    </Col>
                )}
            </Row>
        </Card.Text>
    )
}
export default CertificateCard
