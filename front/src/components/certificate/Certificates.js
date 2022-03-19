import { useEffect, useState } from "react";
import * as Api from '../../api'
import {Row, Col, Card, Button} from 'react-bootstrap'
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import '../../App.css'


function Certificates({portfolioOwnerId, isEditable}){
    const [certificates, setCertificates] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        Api.get("certificatelist", portfolioOwnerId).then((res) => setCertificates(res.data))
    }, [portfolioOwnerId])

    return (
        <Card
            style={{backgroundColor: '#FFF5F5'}}>
            <Card.Body>
                <Card.Title class="mvpType">자격증</Card.Title>
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

                            <button
                                onClick={() => setIsAdding(true)}
                                className="formAddButton">
                            </button>
                            
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