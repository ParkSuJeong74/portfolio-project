import { useEffect, useState } from "react";
import * as Api from '../../api'
import {Row, Col, Card} from 'react-bootstrap'
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import Style from '../../App.module.css'

function Certificates({portfolioOwnerId, isEditable}){
    const [certificates, setCertificates] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        Api.get("certificate/list", portfolioOwnerId).then((res) => setCertificates(res.data))
    }, [portfolioOwnerId])

    return (
        <Card
            style={{backgroundColor: '#FFF5F5', borderRadius: '15px'}}>
            <Card.Body>
                <Card.Title class={Style.mvpType}>자격증</Card.Title>

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
                                className={Style.formAddButton}>
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
