import {Form, Button, Col} from 'react-bootstrap'
import React, {useState} from 'react'
import * as Api from '../../api'

function AwardAddForm({setIsAdding, portfolioOwnerId, setAwards}){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    async function submitHandler(e){

        e.preventDefault()
        e.stopPropagation()
        
        const user_id = portfolioOwnerId

        //입력한 추가내용들을 post 요청함. 엔드포인트: 'award/create'
        await Api.post("award/create", {
            user_id: portfolioOwnerId,
            title,
            description,
        })

        //추가를 해놨으니까, 다시 get 요청함. 엔드포인트: "awardlist/유저아이디"
        const res = Api.get("awardlist", user_id)
        //awards를 res.data로 세팅함
        setAwards(res.data)
        //추가하는 과정이 끝났으니까 isAdding을 false로 설정함.
        setIsAdding(false)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle" className="mb-3">
                <Form.Label>수상명</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="수상내역" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mb-3">
                <Form.Label>상세내용</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="상세내역"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            
            <Form.Group className="text-center">
                <Col>
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

export default AwardAddForm