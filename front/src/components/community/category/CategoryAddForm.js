import { useContext, useState } from 'react'
import {Form} from 'react-bootstrap'
import { UserStateContext } from '../../../App'
import Style from '../../../App.module.css'
import * as Api from '../../../api'

function CategoryAddForm({setIsAdding, dispatch}){
    const userState = useContext(UserStateContext)
    const userId = userState.user?.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    async function submitHandler(e){
        e.preventDefault()

        //TODO: Api post 요청하기!
        try{
            const newCategory = await Api.post('category/create', {
                userId,
                name, description
            })

            dispatch({
                type: 'ADD',
                payload: {id:newCategory.data.id, name, description}
            })

            setIsAdding(false)
        } catch(error){
            alert(error.response.data)
        }
    }
    
    return (
        <Form onSubmit={submitHandler} className="p-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    className="mb-3"
                    type="text" 
                    placeholder="게시판 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                
                <Form.Control 
                    type="text" 
                    placeholder="게시판에 대한 설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />

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
