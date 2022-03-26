import { useContext, useState } from "react"
import { Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router"
import Style from '../../../App.module.css'
import * as Api from '../../../api'
import { UserStateContext } from "../../../App"

const ArticleEditForm = ({ currentArticle, dispatch, setIsEditing }) => {
    const { id, author } = currentArticle

    const userState = useContext(UserStateContext)
    const userId = userState.user?.id

    
    const [hidden, setHidden] = useState(currentArticle?.hidden)
    const [title, setTitle] = useState(currentArticle?.title)
    const [description, setDescription] = useState(currentArticle?.description)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            //TODO: Api put 요청하기!
            await Api.put(`article/${id}`, {
                userId,
                author,
                hidden,
                title,
                description
            })

            dispatch({
                type: 'EDIT',
                payload: { id, author, title, description, hidden }
            })

            setIsEditing(false)
            navigate('/')
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <Form onSubmit={submitHandler}>

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

            <Form.Group as={Row} className="text-center mt-3 mb-3">
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
export default ArticleEditForm
