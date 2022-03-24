import { useState } from "react";
import { Col, Row,Card } from "react-bootstrap";
import Style from '../../../App.module.css'
import RemoveModal from "./RemoveModal";

function ArticleCard({article, owner, isLogin, removeArticle, setIsEditing, setIsDetail, setSelectedArticle}){

    //* isEditable은 작성자 = 로그인한 사용자일 때만 가능함
    const isEditable = isLogin && article.author === owner.name

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <Card.Text>
            <Row className={['align-items-center', Style.articleCardText].join(' ')}>
                
                <Col onClick = {() => { setIsDetail(true); setSelectedArticle(article) }}>
                    <span class={Style.articleTitle}>{article.title}</span>
                    <br />
                    <span className="text-muted">{article.description}</span>
                </Col>

                <Col xs={2}>
                    <span className="ms-2 text-muted">작성자: {article.hidden ? '익명' : article.author}</span>
                    <br />

                    {isEditable && (
                        <>
                            <button
                                onClick={() => setIsEditing((prev) => !prev)}
                                className={Style.mvpEditButton}>
                                    수정
                            </button>

                            <button
                                onClick={() => { handleShow() }}
                                className={Style.mvpRemoveButton}>
                                    삭제
                            </button>
                        </>
                    )}
                </Col>

            </Row>
        </Card.Text>
        <RemoveModal show={show} handleClose={handleClose} removeArticle={removeArticle}/>
        </>
    )
}

export default ArticleCard
