import { useState } from "react"
import {Form,Row,Col, Button} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import * as Api from '../../api'
import Style from '../../App.module.css'

function CertificateAddForm({setCertificates, setIsAdding,portfolioOwnerId }){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [whenDate, setWhenDate] = useState(new Date())

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const userId = portfolioOwnerId

        await Api.post("certificate/create", {
            userId: portfolioOwnerId,
            title,
            description,
            whenDate
        })

        const res = await Api.get("certificate/list", userId)
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
                    style={{ 
                        width: 'auto',
                        border: 'solid 2px #DBC7FF'
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                
                <Form.Control 
                    type="text" 
                    placeholder="상세내역"
                    value={description} 
                    style={{
                        border: 'solid 2px #DBC7FF'
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </Form.Group>
            
            <Form.Group as={Col} xs="auto" xxl={3} controlId="formBasicDate" className="mt-3">
                <DatePicker 
                    selected={whenDate}
                    placeholderText="Weeks start on Monday"
                    dateFormat = "yyyy.MM.dd(eee)"
                    onChange={(when_date) => setWhenDate(whenDate)}/> 
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
export default CertificateAddForm
