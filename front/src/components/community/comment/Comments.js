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
function Comments({ isLogin, category, article, owner }) {

    //TODO: dummy data로 시연 -> 초기값 []로 바꿔줘야 됨
    //CRUD할 댓글 상태값
    const [comments, commentDispatch] = useReducer(commentReducer, [])

    const [currentLikeState, setCurrentLikeState] = useState(false)
    const [currentLikeCount, setCurrentLikeCount] = useState(0)

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
                        setCurrentLikeState(res.data.likeState)
                        setCurrentLikeCount(res.data.article.likeCount)
                    })
            } catch (error) {
                alert(error.response.data)
            }
        }
        getData()

    }, [comments])

    const likeState = currentLikeState
    const likeCount = currentLikeCount
    // 추가중 여부
    const [isAdding, setIsAdding] = useState(false);

    // 좋아요 여부
    const [isLike, setIsLike] = useState(likeState)

    // 좋아요 개수
    const [likeNumber, setLikeNumber] = useState(likeCount)

    async function liking() {
        await Api.put(`article/${article.id}/like`, {
            author: article.author
        }).then((res) => {
            // 누를 때마다 좋아요 <-> 좋아요 취소
            setIsLike((prev) => !prev)
            setLikeNumber(res.data.likeUserIdList.length)
        })
    }

    return (
        <>
            <div class={Style.articleDetails}>
                <span class={Style.articleDetailTitle}>{article.title}</span>
                <span class={Style.articleDetailAuthor}>작성자: {article.authorName}</span>
            </div>


            <div style={{ padding: '30px' }}>
                <div class={Style.articleDetailDesc}>{article.description}</div>

                <button onClick={() => {
                    liking()
                }}
                    style={{
                        color: isLike ? 'white' : '#5960c0',
                        backgroundColor: isLike ? '#5960c0' : 'white'
                    }}
                    class={Style.fineIcon}><FontAwesomeIcon icon={faThumbsUp} /></button>

                <div>좋아요 {likeNumber}</div>
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
