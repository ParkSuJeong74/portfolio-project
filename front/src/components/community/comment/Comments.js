import React, { useEffect, useReducer, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../../api";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { commentReducer } from "../../../reducer";
import Style from '../../../App.module.css'

//owner(객체)에는 로그인한 사용자의 정보,
//category(객체)에는 현재 카테고리 정보
function Comments({ isLogin, category, article, owner}) {

    //TODO: dummy data로 시연 -> 초기값 []로 바꿔줘야 됨
    //CRUD할 댓글 상태값
    const [comments, commentDispatch] = useReducer(commentReducer, [])

    useEffect(() => {
        //TODO: Api get 요청하기!
        const getData = async () => {
            try {
                await Api.get(`article/${article.id}`)
                    .then((res) => {
                        //해당 게시글의 댓글 목록 불러오기

                        commentDispatch({
                            type: 'SET',
                            payload: res.data.comment
                        })
                    })
            } catch (err) {
                console.log(err)
            }
        }
        getData()
        
    }, [comments])

    // 추가중 여부
    const [isAdding, setIsAdding] = useState(false);

     // 좋아요 여부
    const [isFine, setIsFine] = useState(false)
    
    async function liking(){
        const res = await Api.put(`article/${article.id}/like`, {
            userId: owner.id,
            author: article.author
        })
        
        console.log(res.data)
    } 

    /* const [likedUser, setLikedUser] = useState([])

    if(isFine){
        let isExist = likedUser.find((id) => id === owner.id)
        //likedUser에 존재하면 
        if(isExist){
            let filtered = likedUser.filter((person) => person !== owner.id)
            //likedUser = filtered
            setLikedUser(filtered)
        }
        else{
            likedUser.push(owner.id)
            setLikedUser((prev) => [...prev, owner.id])
        }
    } 
    
    // lkedUser(좋아요한 사람 목록)에 현재 로그인한 사용자가 있다면 true가 됨 -> 버튼 클릭한 스타일로 만들기!!
    const isButtonColoring = likedUser.find((id) => id === owner.id)
    console.log('likedUser', likedUser)
    console.log('isButtonColoring', isButtonColoring)   */  

    console.log('li',article.likeUserIdList)

    const likeUserIdList = article.likeUserIdList

    //좋아요한 user 리스트에 현재 owner id가 있으면 값이 true, 없으면 값이 false
    const isButtonColoring = likeUserIdList.find((id) => id === owner.id)

    return (
        <>
            <div class={Style.articleDetails}>
                <span class={Style.articleDetailTitle}>{article.title}</span>
                <span class={Style.articleDetailAuthor}>작성자: {article.authorName}</span>
            </div>

            
            <div style={{padding: '30px'}}>
                <div class={Style.articleDetailDesc}>{article.description}</div>

                <button onClick={() => {
                                    setIsFine((prev) => !prev)
                                    liking()
                                }}
                        style={{ color: isButtonColoring ? 'white' : '#5960c0', 
                                backgroundColor: isButtonColoring ? '#5960c0' : 'white' }}
                        class={Style.fineIcon}><FontAwesomeIcon icon={faThumbsUp} /></button>

                <div>좋아요 {article.likeCount}</div>
            </div>

            <Card>
                <Card.Body className={Style.commentBackground}>
                    <Card.Title className="mb-3">
                        댓글
                        {/* 로그인했을 때만 댓글 추가할 수 있음 */}
                        {isLogin && <FontAwesomeIcon className={Style.commentIcon} onClick={() => setIsAdding((prev) => !prev)} icon={faCommentDots} />}
                    </Card.Title>

                    {isAdding && (
                        <CommentAddForm 
                            owner={owner}
                            comments={comments}
                            dispatch={commentDispatch}
                            setIsAdding={setIsAdding}
                            article={article} />
                    )}

                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            owner={owner}
                            comment={comment}
                            dispatch={commentDispatch}
                            isLogin={isLogin}
                        />
                    ))}
                </Card.Body>
            </Card>
        </>
    )
}

export default Comments
