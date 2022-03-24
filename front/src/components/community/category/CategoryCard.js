import {ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import Style from '../../../App.module.css'

function CategoryCard({setIsArticleOpen, setSelectedCategory, setIsEditing, category}){
    
    return (
        <ListGroup.Item 
            className={Style.categoryItem} 
            value = {category.name}
            onClick={() => {
                setIsArticleOpen(true)
                setSelectedCategory(category)
            }}>

            {category.name}
            
            <FontAwesomeIcon 
                className="ms-1" 
                style={{color: 'brown'}} 
                onClick={() => setIsEditing(true)} 
                icon={faPencil} />
            
        </ListGroup.Item>
    )
}

export default CategoryCard
