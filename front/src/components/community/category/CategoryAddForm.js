import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

function CategoryAddForm({setIsAdding, setCategories}){
    const [title, setTitle] = useState("")

    async function submitHandler(e){
        e.preventDefault()

        {/* 원래는 입력한 것 post하고, 다시 get해서 res.data(객체 형태)를 setCategories()에 넣어야 합니다! */}
        /* await Api.post("category/create", {
            title,
        } 
        const res = await Api.get("category/list");
        setCategories(res.data);
        */
        setCategories((c) => {
            return [...c, title]
        })
        setIsAdding(false)
    }
    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>카테고리명</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="이곳에 입력하세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                <Form.Text className="text-muted">
                어떤 종류의 커뮤니티를 만들건가요?
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                추가
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
            </Button>
        </Form>
    )
}
export default CategoryAddForm