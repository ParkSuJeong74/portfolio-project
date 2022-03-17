import { useState } from "react"
import {Form,Row,Col, Button} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import * as Api from '../../api'

function CertificateAddForm({setCertificates, setIsAdding,portfolioOwnerId }){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const user_id = portfolioOwnerId

        await Api.post("certificate/create", {
            user_id: portfolioOwnerId,
            title,
            description,
            date
        })

        const res = Api.get("certificatelist", user_id)
        setCertificates(res.data)
        setIsAdding(false)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle" className="mt-3">
                
                <Form.Control 
                    type="text"
                    placeholder="자격증제목" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                
                <Form.Control 
                    type="text" 
                    placeholder="상세내역"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />

            </Form.Group>
            
            <Form.Group as={Col} xs="auto" xxl={3} controlId="formBasicDate" className="mt-3">
                <DatePicker 
                    selected={date}
                    placeholderText="Weeks start on Monday"
                    dateFormat = "yyyy.MM.dd(eee)"
                    onChange={(date) => setDate(date)}/> 
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button className="me-3" variant="primary" type="submit">
                        확인
                    </Button>
                    <Button variant="secondary" onClick={() => setIsAdding(false)}> 
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}
export default CertificateAddForm