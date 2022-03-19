import {Card, Button, Col,Row } from 'react-bootstrap'

function CertificateCard({isEditable, setIsEditing, certificate}){
    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{certificate.title}</span>
                    <br />
                    <span className="text-muted">{certificate.description}</span>
                    <br />
                    <span className="text-muted">{certificate.when_date}</span>
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
export default CertificateCard