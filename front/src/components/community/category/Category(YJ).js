import {ListGroup} from 'react-bootstrap'
import { useState } from "react"
import * as Api from '../../../api'
import Articles from './Articles'

function Category({category, setIsViewable}){

    const [page, setPage] = useState('')
    const res = await Api.get("articlelist", category_name);
    setPage(res.data);
    // 해당 카테고리네임을 가진 articlelist값을 받아오기

    

    

    return (
        <ListGroup variant="flush">
            <ListGroup.Item onClick={() => {
                setIsViewable(true)
                //category_name={category_name}
                //카테고리 이름을 클릭하면 category_name을 해당 category_name으로 세팅해주기 그리고 Home.js로 넘어가기

                
            }}>
                {category}
            </ListGroup.Item>
        </ListGroup>
        
    )
} 
export default Category