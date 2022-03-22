import React, {useState} from 'react'
import CommentCard from './CommentCard'
import CommentEditForm from './CommentEditForm'


function Comment({comment, setComments, isEditable, ownerId}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {isEditing ? (
                <CommentEditForm 
                    setComments={setComments}
                    currentComments={comment}
                    setIsEditing={setIsEditing}
                    ownerId={ownerId}
                />
            ) : (
                <CommentCard 
                    comment={comment}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing} 
                    ownerId={ownerId}                  
                />
            )}
        </>
    )
}

export default Comment