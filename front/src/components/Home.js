import { Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect, useContext, useReducer } from "react"

import * as Api from "../api"

import { UserStateContext } from "../App"

import User from "./user/User"
import Articles from "./community/article/Articles"
import LoginForm from "./user/LoginForm"
import Categories from "./community/category/Categories"
import { categoryReducer } from "../reducer"

function Home(){
    const navigate = useNavigate()
	const params = useParams();

	const [owner, setOwner] = useState(null)

	const userState = useContext(UserStateContext)

	const fetchOwner = async (ownerId) => {
		const res = await Api.get("user", ownerId)
		const ownerData = res.data
		setOwner(ownerData)
	};

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

	//* 특정 카데고리를 클릭하면 해당하는 article들을 이제 보여줌
	const [IsArticleOpen, setIsArticleOpen] = useState(false)

	// CRU할 카테고리 상태값
	const [categories, categoryDispatch] = useReducer(categoryReducer,[])

	//* category 컴포넌트 내에서 선택된 카테고리를 가져오는 상태값
	const [selectedCategory, setSelectedCategory] = useState({})

	// 초기화면에서 공지사항 게시판이 바로 보이도록 하는 상태
	const [IsinitialCategory, setIsinitialCategory] = useState(false)

	//초기화면에 나올 카테고리 가져오기
	const [initialCategory, setInitialCategory] = useState({})

	useEffect(() => {
		const categoryName = '*공지사항*'
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
						<User 
							portfolioOwnerId={userState.user?.id}/>
					) : (
						<LoginForm />
					)}
					<Categories 
						categories={categories}
						isLogin={isLogin}
						dispatch={categoryDispatch}						
						setIsArticleOpen={setIsArticleOpen}
						setSelectedCategory={setSelectedCategory}
						setIsinitialCategory={setIsinitialCategory}/>	
				</Col>

				<Col xxl={9} className="mb-4">
					{IsinitialCategory && (
						<Articles
							isLogin={isLogin}
							owner={owner} 
							category={initialCategory} />
					)}

					{IsArticleOpen && (
						<Articles
							isLogin={isLogin}
							owner={owner}
							category={selectedCategory} />
					)}
				</Col>
			</Row>
		</Container>
	)
}
export default Home
