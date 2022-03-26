import { useState } from "react"
import {Form,Col,Row} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import * as Api from '../../api'
import Style from '../../App.module.css'
import {TimeUtil} from '../../common/timeUtil'

function CertificateEditForm({setCertificates, currentCertificate,setIsEditing}){
    const [title, setTitle] = useState(currentCertificate.title)
    const [description, setDescription] = useState(currentCertificate.description)
    const [whenDate, setWhenDate] = useState(
        new Date(currentCertificate.whenDate)
    )

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const userId = currentCertificate.userId

        const when_date = (TimeUtil.getTime(whenDate)).toISOString().split('T')[0]

        await Api.put(`certificate/${currentCertificate.id}`,{
            userId,
            title,
            description,
            whenDate: when_date
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
                    onChange={(whenDate) => setWhenDate(whenDate)}/>
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
