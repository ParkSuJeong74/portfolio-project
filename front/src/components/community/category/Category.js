import { useContext } from 'react'
import {ListGroup} from 'react-bootstrap'
import { CategoryContext, UserStateContext } from '../../../App'

function Category({category, setIsArticleOpen}){

    const {categoryState, categoryDispatch} = useContext(CategoryContext)
    
    return (
    <>
        <ListGroup variant="flush">
            <ListGroup.Item onClick={() => {
                setIsArticleOpen(true)
                alert("카테고리를 클릭하면 해당 카테고리에 들어있는 article들을 보여줘야 함.")

                categoryDispatch({
                    type: "SET_CATEGORY",
                    payload: category
                })
                {/*클릭된 category정보 하나가 categoryState로 저장될까요..? */}
                console.log('categoryState? ',categoryState)
            }}>
                {category}
            </ListGroup.Item>
        </ListGroup>
        
    </>
    )
} 
export default Category