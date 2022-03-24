import React, {useState} from 'react'
import {Form, Button, Row,Col} from 'react-bootstrap'
import * as Api from '../../../api'


function CommentEditForm({currentComment, setComments, setIsEditing, ownerId}){
    
    const [description, setDescription] = useState(currentComment.description)

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        
        const user_id = currentComment.user_id

        //수정한 내용들을 put 요청함. 엔드포인트: 'awards/유저아이디'
        await Api.put(`comments/${currentComment.id}`, {
            user_id,
            description
        })

        //수정을 해놨으니까, 다시 get 요청함. 엔드포인트: "awardlist/유저아이디"
        const res = await Api.get("commnetlist", user_id)
        setComments(res.data)

        //추가하는 과정이 끝났으니까 isAdding을 false로 설정해서 수정폼을 안보이게 함
        setIsEditing(false)
    }

    return (
        <>
            <div>{ownerId}</div>


            <Form onSubmit={submitHandler}>
            
                
            

                <Form.Group controlId="formBasicDescription" className="mt-3">
                
                    <Form.Control 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
            
                <Form.Group as={Row} className="text-center mt-3">
                    <Col sm={{ span: 20 }}>
                        <Button className="me-3" variant="primary" type="submit">
                            확인
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}> 
                            취소
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

export default CommentEditForm

