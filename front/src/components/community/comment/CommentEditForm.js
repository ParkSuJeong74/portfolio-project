import React, {useState} from 'react'
import {Form, Row,Col} from 'react-bootstrap'
import Style from '../../../App.module.css'
import * as Api from '../../../api'

function CommentEditForm({owner, currentComment, dispatch, setIsEditing}){
    
    const {id, writerName} = currentComment
    const [comment, setComment] = useState(currentComment.comment)
    const [hidden, setHidden] = useState(currentComment.hidden)

    async function submitHandler(e){
        e.preventDefault()
        
        //TODO: Api put 요청함!
        try {
            await Api.put(`comment/${id}`, {
                userId: owner.id,
                comment: comment,
                hidden: hidden,
                writerName: owner.nickname
            })

            dispatch({
                type: 'EDIT',
                payload: {id, comment, writerName: owner.nickname, hidden}
            })
    
            setIsEditing(false)
        } catch (error) {
            console.log(error.response)
            //alert(error.response.data)
        }
        
    }

    return (
        <Form onSubmit={submitHandler}>

            <Form.Check 
                type="checkbox"
                label= "익명"
                checked = {hidden}
                onChange={() => setHidden((prev) => !prev)} />      
        
            <Form.Group controlId="formBasicContent" className="mt-3">
                <Form.Control 
                    type="text" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
        
            <Form.Group as={Row} className="text-center mt-3">
                <Col sm={{ span: 20 }}>

                    <button
                        type="submit"
                        className={[Style.confirmButton, Style.communityAddButton].join(' ')}>
                        확인
                    </button>

                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className={Style.cancelButton}>
                        취소
                    </button>

                </Col>
            </Form.Group>
        </Form>
        
    )
}

export default CommentEditForm
