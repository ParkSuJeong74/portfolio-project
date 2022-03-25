import { useEffect, useReducer, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Article from './Article'
import * as Api from "../../../api"
import ArticleAddForm from './ArticleAddForm'
import Style from '../../../App.module.css'
import ArticleDetail from './ArticleDetail'
import { articleReducer } from '../../../reducer'

//props에 owner와 category를 가져옴
//owner(객체)에는 로그인한 사용자의 정보,
//category(객체)에는 현재 카테고리 정보
const Articles = ({ isLogin, category, owner }) => {

    //CRUD할 게시글 상태값
    const [articles, articleDispatch] = useReducer(articleReducer, [])

    //TODO: API get 요청해서 set하기!
    useEffect(() => {
        const getData = async () => {
            try {
                await Api.get(`category/${category.name}`)
                    .then((res) => {
                        console.log('res',res.data)
                        articleDispatch({
                            type: 'SET',
                            payload: res.data.article
                        })
                    })
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])
    console.log(articles)
    //* ArticleDetail 컴포넌트로 선택된 게시글을 가져가는 상태값
    const [selectedArticle, setSelectedArticle] = useState(null)

    // 추가 중인지 여부
    const [isAdding, setIsAdding] = useState(false)

    //* 게시글 상세 페이지로 이동하는 상태값, true: 상세페이지, false: 게시글 목록
    const [isDetail, setIsDetail] = useState(false)

    return (
        <Card className={'mt-4'}>
            <div class={Style.articleItem}>
                <Card.Title style={{ fontWeight: 'bolder' }}>{category.name}</Card.Title>
            </div>

            {isDetail ? (
                <ArticleDetail
                    category={category}
                    setIsDetail={setIsDetail}
                    selectedArticle={selectedArticle}
                    isLogin={isLogin}
                    owner={owner} />
            ) : (
                <Card.Body style={{ backgroundColor: "#F6F7FF" }}>
                    {/*로그인했을 때만 글작성할 수 있음 */}
                    {isLogin && (
                        <Row className="text-center">
                            <Col className="mb-4">
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className={[Style.formAddButton, Style.communityAddButton].join(' ')}>
                                </button>
                            </Col>
                        </Row>
                    )}

                    {isAdding && (
                        <ArticleAddForm
                            owner={owner}
                            category={category}
                            articles={articles}
                            dispatch={articleDispatch}
                            setIsAdding={setIsAdding} />
                    )}

                    {articles.map((article) => (
                        <Article
                            key={article.id}
                            category={category}
                            article={article}
                            dispatch={articleDispatch}
                            owner={owner}
                            isLogin={isLogin}
                            setIsDetail={setIsDetail}
                            setSelectedArticle={setSelectedArticle}
                        />
                    ))}
                </Card.Body>
            )}
        </Card>
    )
}
export default Articles
