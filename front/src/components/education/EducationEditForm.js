import { useState } from 'react'
import {Form,Col,Row} from 'react-bootstrap'
import * as Api from '../../api'
import Style from '../../App.module.css'

function EducationEditForm({setEducations, currentEducation, setIsEditing}){
    const [school, setSchool] = useState(currentEducation.school)
    const [major, setMajor] = useState(currentEducation.major)
    const [position, setPosition] = useState(currentEducation.position)
    
    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const userId = currentEducation.userId
        console.log(school ? currentEducation.school : school)

        try{
            await Api.put(`educations/${currentEducation.id}`, {
                userId,
                school,
                major,
                position
            })

            const res = await Api.get("educationlist", userId)
            console.log(res.data)
            setEducations(res.data)

            setIsEditing(false)
            
        } catch(err) {
            console.log(err)
        }
    }
    
    const positionInformations = ['재학중', '학사졸업', '석사졸업', '박사졸업']

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicSchool" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder={currentEducation.school}
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
                    placeholder={currentEducation.major}
                    value={major}
                    style={{
                        border: 'solid 2px #DBC7FF'
                    }}
                onChange={(e) => setMajor(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPosition" className="mt-3">

                {positionInformations.map((Info, index) => (
                    
                    <label style={{margin: '7px'}}>
                        <input 
                            style={{marginRight: '7px'}}
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
                    onClick={() => setIsEditing(false)}
                    className={Style.mvpCancelButton}>
                    취소
                </button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default EducationEditForm
