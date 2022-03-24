import { useContext, useState } from 'react'
import {Form} from 'react-bootstrap'
import { UserStateContext } from '../../../App'
import Style from '../../../App.module.css'

function CategoryAddForm({setIsAdding, dispatch}){
    const userState = useContext(UserStateContext)
    const userId = userState.id

    const [name, setName] = useState('')

    async function submitHandler(e){
        e.preventDefault()

        //TODO: Api post 요청하기!
        /* await Api.post("category/create", {
            name,
            userId
        } 
        const res = await Api.get("category/list");
        setCategories(res.data);
        */

        dispatch({
            type: 'ADD',
            payload: {userId, name}
        })
        setIsAdding(false)
    }
    
    return (
        <Form onSubmit={submitHandler} className="p-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    type="text" 
                    placeholder="이곳에 입력하세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <Form.Text className="text-muted">
                    어떤 종류의 커뮤니티를 만들건가요?
                </Form.Text>
            </Form.Group>

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
        </Form>
    )
}
export default CategoryAddForm
