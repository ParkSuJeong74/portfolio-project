import { useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import * as Api from "../../../api"
import Style from "../../../App.module.css"

const ArticleAddForm = ({
    owner,
    category,
    articles,
    dispatch,
    setIsAdding,
}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [hidden, setHidden] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            //TODO: Api post 요청!
            const newArticle = await Api.post("articles", {
                author: owner.id,
                categoryId: category.id,
                hidden,
                title,
                description,
            })

            dispatch({
                type: "ADD",
                payload: newArticle.data,
            })

            setIsAdding(false)
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Check
                type="checkbox"
                label="익명"
                checked={hidden}
                onChange={() => setHidden((prev) => !prev)}
            />

            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <textarea
                    class="form-control"
                    placeholder="본문"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 mb-3 text-center">
                <Col sm={{ span: 20 }}>
                    <button
                        type="submit"
                        className={[
                            Style.confirmButton,
                            Style.communityAddButton,
                        ].join(" ")}
                    >
                        확인
                    </button>

                    <button
                        onClick={() => setIsAdding(false)}
                        className={Style.cancelButton}
                    >
                        취소
                    </button>
                </Col>
            </Form.Group>
        </Form>
    )
}
export default ArticleAddForm
