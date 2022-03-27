import { useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import Style from '../../../App.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import * as Api from '../../../api'

function CategoryEditForm({ dispatch, setIsEditing, currentCategory}){

    console.log(currentCategory)
    const [name, setName] = useState(currentCategory?.name)
    const [description, setDescription] = useState(currentCategory?.description)
    
    async function editCategory(){
        //TODO: api 수정 하기!
        try{    
            const editedCategory = await Api.put(`category/${currentCategory?.name}`, {
                name, description
            })

            dispatch({
                type: 'EDIT',
                payload: {id:currentCategory.id, name, description}
            })

            setIsEditing(false)
        } catch(error){
            alert(error.response.data)
        }
    }

    return (
        <ListGroup.Item className={Style.categoryItem}>
            <input 
                style={{marginRight: '25px'}}
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}/>
            
            <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}/>

            <span style={{marginLeft: '10px'}} onClick={() => editCategory()}>
                    <FontAwesomeIcon icon={faCheck} />
            </span>
        </ListGroup.Item>
    )
}
export default CategoryEditForm
