import { useState } from "react"
import { Form, Col, Row } from 'react-bootstrap'
import * as Api from '../../../api'
import Style from '../../../App.module.css'

//articles(객체)에는  전체 게시글 정보,
//owner(객체)에는 로그인한 사용자의 정보,
//category(객체)에는 현재 카테고리 정보
const ArticleAddForm = ({ owner, category, articles, dispatch, setIsAdding }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    //* 익명버튼 상태
    const [hidden, setHidden] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            //TODO: Api post 요청!
            await Api.post(`article/create`, {
                categoryName: category.name,
                hidden: articles.hidden,
                title: articles.title,
                description: articles.description
            })

            dispatch({
                type: 'ADD',
                payload: {
                    author: owner.name, title, description, hidden
                }
            })

            setIsAdding(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Check
                type="checkbox"
                label="익명"
                checked={hidden}
                onChange={() => setHidden((prev) => !prev)} />

            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <textarea
                    class="form-control"
                    placeholder="본문"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 mb-3 text-center">
                <Col sm={{ span: 20 }}>
                    <button
                        type="submit"
                        className={[Style.confirmButton, Style.communityAddButton].join(' ')}>
                        확인
                    </button>

                    <button
                        onClick={() => setIsAdding(false)}
                        className={Style.cancelButton}>
                        취소
                    </button>
                </Col>
            </Form.Group>
        </Form>
    )
}
export default ArticleAddForm
