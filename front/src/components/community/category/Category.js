import { useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import CategoryEditForm from './CategoryEditForm';
import Style from '../../../App.module.css'

function Category({category, setIsArticleOpen, setSelectedCategory, dispatch, setIsinitialCategory}){

    // 편집중인지 여부
    const [isEditing, setIsEditing] = useState(false)

    return (
    <>
        <ListGroup >
            {isEditing ? (
                <CategoryEditForm 
                    dispatch={dispatch}
                    setIsEditing={setIsEditing}
                    currentCategory={category} />
            ) : (
                <Link to={`/${category.id}`} className={Style.cateLink}>
                    <CategoryCard 
                        setIsArticleOpen={setIsArticleOpen}
                        setSelectedCategory={setSelectedCategory}
                        setIsEditing={setIsEditing}
                        category={category} 
                        setIsinitialCategory={setIsinitialCategory}/>
                </Link>
            )}

        </ListGroup>
        
    </>
    )
} 
export default Category
