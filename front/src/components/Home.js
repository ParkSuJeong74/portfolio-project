import { useState, useEffect, useReducer } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"

import * as Api from "../api"

import User from "./user/User"
import Articles from "./community/article/Articles"
import LoginForm from "./user/LoginForm"
import Categories from "./community/category/Categories"
import { categoryReducer } from "../reducer"

function Home() {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useSelector((state) => state.user)

  const [categories, categoryDispatch] = useReducer(categoryReducer, [])
  const [owner, setOwner] = useState(null)
  const [IsArticleOpen, setIsArticleOpen] = useState(false) // 카테고리 하위 Article visible 여부 저장
  const [selectedCategory, setSelectedCategory] = useState({}) // 선택된 카테고리 저장
  const [IsinitialCategory, setIsinitialCategory] = useState(false) // 공지사항 visible 여부 저장
  const [initialCategory, setInitialCategory] = useState({}) // 카테고리 리스트 저장

  const fetchOwner = async (ownerId) => {
    const res = await Api.get("user", ownerId)
    const ownerData = res.data
    setOwner(ownerData)
  }

  useEffect(() => {
    if (params.userId) {
      const ownerId = params.userId
      fetchOwner(ownerId)
    } else {
      const ownerId = userState.user?.id
      fetchOwner(ownerId)
    }
  }, [params, userState, navigate])

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user

  useEffect(() => {
    const categoryName = "*공지사항*"
    Api.get(`category/${categoryName}`).then((res) => {
      setInitialCategory(res.data.category)
      setIsinitialCategory(true)
    })
  }, [])

  return (
    <Container>
      <Row xs={1} xxl={2}>
        <Col md="3" lg="3" xxl={3}>
          {isLogin ? (
            <User portfolioOwnerId={userState.user?.id} />
          ) : (
            <LoginForm />
          )}
          <Categories
            categories={categories}
            isLogin={isLogin}
            dispatch={categoryDispatch}
            setIsArticleOpen={setIsArticleOpen}
            setSelectedCategory={setSelectedCategory}
            setIsinitialCategory={setIsinitialCategory}
          />
        </Col>

        <Col xxl={9} className="mb-4">
          {IsinitialCategory && (
            <Articles
              isLogin={isLogin}
              owner={owner}
              category={initialCategory}
            />
          )}

          {IsArticleOpen && (
            <Articles
              isLogin={isLogin}
              owner={owner}
              category={selectedCategory}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}
export default Home
