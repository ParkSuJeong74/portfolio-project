import React, {useState} from 'react'
import CommentCard from './CommentCard'
import CommentEditForm from './CommentEditForm'


function Comment({comment, setComments, isEditable}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {isEditing ? (
                <CommentEditForm 
                    setComments={setComments}
                    currentComments={comment}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <CommentCard 
                    comment={comment}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}                   
                />
            )}
        </>
    )
}

export default Comment