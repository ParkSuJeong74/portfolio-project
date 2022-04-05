import { Card, Row, Col } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import * as Api from '../../api'
import Education from './Education'
import EducationAddForm from './EducationAddForm'
import Style from '../../App.module.css'

function Educations({ portfolioOwnerId, isEditable }) {
    const [educations, setEducations] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        async function getData(){
            try{
                await Api.get("education/list", portfolioOwnerId).then((res) => setEducations(res.data))
            } catch(error) {
                alert(error.response.data)
            }
        }
        getData()
    }, [portfolioOwnerId])

    return (
        <Card
            style={{backgroundColor: '#FFF5F5' , borderRadius: '15px'}}>
            <Card.Body>
                <Card.Title class={Style.mvpType}>학력</Card.Title>

                {educations.map((education) => (
                    <Education
                        key={education.id}
                        education={education}
                        isEditable={isEditable}
                        setEducations={setEducations}
                    />
                ))}

                {isEditable && (
                    <Row className="text-center mt-3 mb-4">
                        <Col sm={{ span: 20 }}>

                        <button
                            onClick={() => setIsAdding(true)}
                            className={Style.formAddButton}>
                        </button>
                        
                        </Col>
                    </Row>
                )}
                
                {isAdding && (
                    <EducationAddForm
                        setIsAdding={setIsAdding}
                        portfolioOwnerId={portfolioOwnerId}
                        setEducations={setEducations} />
                )}

            </Card.Body>
        </Card>
    )
}

export default Educations
