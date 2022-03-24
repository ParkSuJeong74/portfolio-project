import { useState } from "react"
import {Form,Col,Button,Row} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import * as Api from '../../api'
import Style from '../../App.module.css'


function CertificateEditForm({setCertificates, currentCertificate,setIsEditing}){
    const [title, setTitle] = useState(currentCertificate.title)
    const [description, setDescription] = useState(currentCertificate.description)
    const [whenDate, setWhenDate] = useState(
        new Date(currentCertificate.when_date)
    )

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const userId = currentCertificate.userId

        await Api.put(`certificates/${currentCertificate.id}`,{
            userId,
            title,
            description,
            whenDate
        })

        const res = await Api.get("certificate/list", userId)
        setCertificates(res.data)
        setIsEditing(false)
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
                    placeholderText="취득날짜"
                    dateFormat = "yyyy.MM.dd(eee)"
                    onChange={(when_date) => setWhenDate(when_date)}/>
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
export default CertificateEditForm
