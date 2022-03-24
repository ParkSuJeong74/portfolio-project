import React, {useState} from 'react'
import {Form, Button, Row,Col} from 'react-bootstrap'
import * as Api from '../../api'
import Style from '../../App.module.css'


//현재 award(currentAward)의 title, description을 상태로 설정해야 함
function AwardEditForm({currentAward, setAwards, setIsEditing}){
    const [title, setTitle] = useState(currentAward.title)
    const [description, setDescription] = useState(currentAward.description)

    async function submitHandler(e){
        e.preventDefault()
        e.stopPropagation()

        //currentAward의 user_id를 user_id 변수에 할당함
        const user_id = currentAward.user_id

        //수정한 내용들을 put 요청함. 엔드포인트: 'awards/유저아이디'
        await Api.put(`awards/${currentAward.id}`, {
            user_id,
            title,
            description
        })

        //수정을 해놨으니까, 다시 get 요청함. 엔드포인트: "awardlist/유저아이디"
        const res = await Api.get("awardlist", user_id)
        console.log(res.data)
        setAwards(res.data)

        //추가하는 과정이 끝났으니까 isAdding을 false로 설정해서 수정폼을 안보이게 함
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
