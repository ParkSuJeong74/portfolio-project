import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import * as Api from '../../api'
import '../../App.css'


function EducationAddForm({ setIsAdding, portfolioOwnerId, setEducations }) {
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')
    const [position, setPosition] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()

        const user_id = portfolioOwnerId

        await Api.post('education/create', {
            user_id: portfolioOwnerId,
            school,
            major,
            position
        })

        const res = await Api.get("educationlist", user_id)
        setEducations(res.data)
        setIsAdding(false)
    }

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
                <Form.Check
                    inline
                    type="radio"
                    name="재학중"
                    id="재학중"
                    label="재학중"
                    checked={position === '재학중'}
                    onChange={(e) => setPosition(e.target.name)}
                />
                <Form.Check
                    inline
                    type="radio"
                    name="학사졸업"
                    id="학사졸업"
                    label="학사졸업"
                    checked={position === '학사졸업'}
                    onChange={(e) => setPosition(e.target.name)}
                />
                <Form.Check
                    inline
                    type="radio"
                    name="석사졸업"
                    id="석사졸업"
                    label="석사졸업"
                    checked={position === '석사졸업'}
                    onChange={(e) => setPosition(e.target.name)}
                />
                <Form.Check
                    inline
                    type="radio"
                    name="박사졸업"
                    id="박사졸업"
                    label="박사졸업"
                    checked={position === '박사졸업'}
                    onChange={(e) => setPosition(e.target.name)}
                />

            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                <button
                    type="submit"
                    className="mvpConfirmButton me-3">
                    확인
                </button>

                <button
                    onClick={() => setIsAdding(false)}
                    className="mvpCancelButton">
                    취소
                </button>
                </Col>
            </Form.Group>
        </Form>
    )
}
export default EducationAddForm