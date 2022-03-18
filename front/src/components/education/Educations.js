import {Card, Row, Col, Button} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import * as Api from '../../api'
import Education from './Education'
import EducationAddForm from './EducationAddForm'

function Educations({portfolioOwnerId, isEditable}) {
    const [educations, setEducations] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        Api.get("educationlist", portfolioOwnerId).then((res) => setEducations(res.data))
    }, [portfolioOwnerId])

    return (
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                {educations.map((education) => (
                    <Education 
                        key={educations.id}
                        education={education}
                        isEditable={isEditable}
                        setEducations={setEducations}
                    />
                ))}
                {isEditable && (
                    <Row className="text-center mt-3 mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <EducationAddForm 
                        setIsAdding={setIsAdding}
                        portfolioOwnerId={portfolioOwnerId}
                        setEducations={setEducations}/>
                )}
                
            </Card.Body>
        </Card>
    )
}

export default Educations