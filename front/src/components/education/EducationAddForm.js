import { Form, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import * as Api from '../../api'
import Style from '../../App.module.css'

function EducationAddForm({ setIsAdding, portfolioOwnerId, setEducations }) {
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')
    const [position, setPosition] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            const newEducation = await Api.post('education/create', {
                userId: portfolioOwnerId,
                school,
                major,
                position
            })
            setEducations((prev) => [...prev, newEducation.data])
            
            setIsAdding(false)
        } catch(error) {
            alert(error.response.data)
        }
    }

    const positionInformations = ['재학중', '학사졸업', '석사졸업', '박사졸업']

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicSchool" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="학교이름"
                    value={school}
                    style={{ 
                        width: 'auto',
                        border: 'solid 2px #DBC7FF'
                    }}
                    onChange={(e) => setSchool(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicMajor" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    value={major}
                    style={{
                        border: 'solid 2px #DBC7FF'
                    }}
                    onChange={(e) => setMajor(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPosition" className="mt-3">

                {positionInformations.map((Info, index) => (
                    <label style={{ margin: '7px' }}>
                        <input
                            style={{ marginRight: '7px' }}
                            type="radio"
                            key={index}
                            inline
                            name={Info}
                            id={Info}
                            checked={position === Info}
                            onChange={(e) => setPosition(e.target.name)}
                        />
                        {Info}
                    </label>
                ))}
                
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                <button
                    type="submit"
                    className={Style.mvpConfirmButton}>
                    확인
                </button>

                <button
                    onClick={() => setIsAdding(false)}
                    className={Style.mvpCancelButton}>
                    취소
                </button>
                </Col>
            </Form.Group>
        </Form>
    )
}
export default EducationAddForm
