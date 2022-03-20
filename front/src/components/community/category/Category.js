import {ListGroup} from 'react-bootstrap'

function Category({category, setIsViewable}){

    return (
        <ListGroup variant="flush">
            <ListGroup.Item onClick={() => {
                setIsViewable(true)
                alert("카테고리를 클릭하면 해당 카테고리에 들어있는 article들을 보여줘야 함.")
            }}>
                {category}
            </ListGroup.Item>
        </ListGroup>
    )
} 
export default Category