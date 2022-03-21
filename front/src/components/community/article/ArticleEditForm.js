import { useState } from "react"
import {Form, Row, Col, Button} from 'react-bootstrap'
import * as Api from '../../../api'


function ArticleEditForm({ setArticles, currentArticle, setIsEditing}){
    const [title, setTitle] = useState(currentArticle.title)
    const [body, setBody] = useState(currentArticle.body)

    async function submitHandler(e){
        e.preventDefault()

        const user_id = currentArticle.user_id

        await Api.put(`articles/${currentArticle.id}`, {
            user_id,
            title,
            body
        })

        //게시글 수정 후에 다시 게시글리스트 get 요청함
        const res = await Api.get("articlelist")

        setArticles(res.data)
        setIsEditing(false)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle">
                
                <Form.Control 
                    type="text"
                    placeholder="수상내역" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                
                <Form.Control 
                    type="text" 
                    placeholder="상세내역"
                    value={body} 
                    onChange={(e) => setBody(e.target.value)}
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
    )

}
export default ArticleEditForm