import React, {useState} from 'react'
import CommentCard from './CommentCard'
import CommentEditForm from './CommentEditForm'
import Api from '../../../api'

function Comment({owner, comment, dispatch, isLogin}) {
    const [isEditing, setIsEditing] = useState(false)

    //* 댓글 작성자 = 로그인한 사용자 일 때만 수정, 삭제 가능함
    const isEditable = isLogin && comment.writer === owner.name

    async function removeComment(){
        //TODO: Api delete요청하기!
        /* try{
            await Api.delete(~~)
        } catch(err){
            console.log(err)
        } */
        dispatch({
            type: 'DELETE',
            payload: comment
        })
    }

    return (
        <>
            {isEditing ? (
                <CommentEditForm 
                    owner={owner} 
                    currentComment={comment}
                    dispatch={dispatch}
                    setIsEditing={setIsEditing} />
            ) : (
                <CommentCard 
                    owner={owner}   
                    comment={comment}
                    isEditable={isEditable}  
                    removeComment={removeComment}   
                    setIsEditing={setIsEditing} />
            )}
        </>
    )
}

export default Comment
