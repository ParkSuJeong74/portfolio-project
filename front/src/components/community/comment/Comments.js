import React, { useLayoutEffect, useReducer, useState } from "react"
import { Card } from "react-bootstrap"
import * as Api from "../../../api"
import Comment from "./Comment"
import CommentAddForm from "./CommentAddForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { commentReducer } from "../../../reducer"
import Style from "../../../App.module.css"

function Comments({ isLogin, category, article, owner }) {
    const [comments, commentDispatch] = useReducer(commentReducer, [])

    const [currentLikeState, setCurrentLikeState] = useState(false)
    const [currentLikeCount, setCurrentLikeCount] = useState(0)

    //TODO: Api get 요청하기!
    //!!!!async-await 일부러 뺀 거임!!!! 추가하지 말것!!!!
    const getData = () => {
        try {
            Api.get(`articles/${article.id}`).then((res) => {
                //해당 게시글의 댓글 목록 불러오기
                commentDispatch({
                    type: "SET",
                    payload: res.data.comment,
                })
                setCurrentLikeState(res.data.likeState)
                setCurrentLikeCount(res.data.article.likeCount)
            })
        } catch (error) {
            alert(error.response.data)
        }
    }
    useLayoutEffect(() => {
        getData()
    }, [article.id])

    const [isAdding, setIsAdding] = useState(false)
    async function liking() {
        try {
            await Api.put(`articles/${article.id}/like`, {
                author: article.author,
            }).then((res) => {
                // 누를 때마다 좋아요 <-> 좋아요 취소
                setCurrentLikeState((prev) => !prev)
                setCurrentLikeCount(res.data.likeUserIdList.length)
            })
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <>
            <div class={Style.articleDetails}>
                <span class={Style.articleDetailTitle}>{article.title}</span>
                <span class={Style.articleDetailAuthor}>
                    작성자: {article.authorName}
                </span>
            </div>

            <div style={{ padding: "30px" }}>
                <div class={Style.articleDetailDesc}>
                    {article.description.split("\n").map((line) => {
                        return (
                            <span>
                                {line}
                                <br />
                            </span>
                        )
                    })}
                </div>

                <button
                    onClick={() => {
                        liking()
                    }}
                    style={{
                        color: currentLikeState ? "white" : "#5960c0",
                        backgroundColor: currentLikeState ? "#5960c0" : "white",
                    }}
                    class={Style.fineIcon}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>

                <div>좋아요 {currentLikeCount}</div>
            </div>

            <Card>
                <Card.Body className={Style.commentBackground}>
                    <Card.Title className="mb-3">
                        댓글
                        {/* 로그인했을 때만 댓글 추가할 수 있음 */}
                        {isLogin && (
                            <FontAwesomeIcon
                                className={Style.commentIcon}
                                onClick={() => setIsAdding((prev) => !prev)}
                                icon={faCommentDots}
                            />
                        )}
                    </Card.Title>

                    {isAdding && (
                        <CommentAddForm
                            owner={owner}
                            comments={comments}
                            dispatch={commentDispatch}
                            setIsAdding={setIsAdding}
                            article={article}
                        />
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
