import { useEffect, useState } from "react";
import * as Api from '../../api'
import {Row, Col, Card, Button} from 'react-bootstrap'
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({portfolioOwnerId, isEditable}){
    const [certificates, setCertificates] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        Api.get("certificatelist", portfolioOwnerId).then((res) => setCertificates(res.data))
    }, [portfolioOwnerId])

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map((certificate) => (
                    <Certificate 
                        key={certificate.id}
                        certificate={certificate}
                        setCertificates={setCertificates}
                        isEditable={isEditable}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <CertificateAddForm 
                        portfolioOwnerId={portfolioOwnerId}
                        setIsAdding={setIsAdding}
                        setCertificates={setCertificates}
                    />
                )}

            </Card.Body>
        </Card>
    )
}

export default Certificates