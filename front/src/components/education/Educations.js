import {Card, Row, Col, Button} from 'react-bootstrap'
import React, {useState} from 'react'

import Education from './Education'
import EducationAddForm from './EducationAddForm'

function Educations({portfolioOwnerId, isEditable}) {
    const [educations, setEducations] = useState([])
    const [isAdding, setIsAdding] = useState(false)

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
                    <Row className="text-center">
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