import React, {useState} from 'react'
import {Form, Row,Col} from 'react-bootstrap'
import * as Api from '../../api'
import Style from '../../App.module.css'

function AwardEditForm({currentAward, setAwards, setIsEditing}){
    const [title, setTitle] = useState(currentAward.title)
    const [description, setDescription] = useState(currentAward.description)

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        const userId = currentAward.userId

        await Api.put(`award/${currentAward.id}`, {
            userId,
            title,
            description
        })

        const res = await Api.get("award/list", userId)
        console.log(res.data)
        setAwards(res.data)

        setIsEditing(false)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle">
                
                <Form.Control 
                    type="text"
                    placeholder="수상내역" 
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
            
            <Form.Group as={Row} className="text-center mt-3">
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

export default AwardEditForm
