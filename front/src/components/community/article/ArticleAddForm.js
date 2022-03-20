import { useState } from "react"
import {Form,Col,Button,Row} from 'react-bootstrap'
import * as Api from '../../../api'

function ArticleAddForm({owner, setIsAdding, setArticles}){
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        //작성자(owner)의 아이디를 user_id 변수에 할당함
        const user_id = owner.id

        //'/:category명/article/create'로 post 요청해서 게시글 등록하기
        await Api.post("article/create", {
            user_id,
            title,
            body
        })

        //'/:category명/articlelist'로 get 요청해서 등록된 게시글도 불러오기
        const res = await Api.get("articlelist")
        setArticles(res.data)
        setIsAdding(false)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
            <Form.Control
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
            <Form.Control
                type="text"
                placeholder="본문"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" className="me-3">
                    등록
                </Button>
                <Button variant="secondary" onClick={() => setIsAdding(false)}>
                    취소
                </Button>
            </Col>
            </Form.Group>
    </Form>
    )
}
export default ArticleAddForm