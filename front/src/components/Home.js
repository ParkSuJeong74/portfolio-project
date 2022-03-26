import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect, useContext, useReducer } from "react";

import * as Api from "../api";

import { UserStateContext } from "../App";

import User from "./user/User";
import Articles from "./community/article/Articles";
import LoginForm from "./user/LoginForm";
import Categories from "./community/category/Categories";
import { categoryReducer } from "../reducer";

function Home(){
    const navigate = useNavigate()
	const params = useParams();

  	// useState 훅을 통해 Owner 상태를 생성함.
	const [owner, setOwner] = useState(null)

	const userState = useContext(UserStateContext);

	const fetchOwner = async (ownerId) => {
		// 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
		const res = await Api.get("user", ownerId);
		// 사용자 정보는 response의 data임.
		const ownerData = res.data;
		// Owner을 해당 사용자 정보로 세팅함.
		setOwner(ownerData);
	};

	useEffect(() => {
		if (params.userId) {
			// 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
			const ownerId = params.userId;
			// 해당 유저 id로 fetchoOwner 함수를 실행함.
			fetchOwner(ownerId);
		} else {
			// 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
			const ownerId = userState.user?.id;

			// 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
			fetchOwner(ownerId);
		}
	}, [params, userState, navigate]);

	// 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
	const isLogin = !!userState.user;

	//* 특정 카데고리를 클릭하면 해당하는 article들을 이제 보여줌
	const [IsArticleOpen, setIsArticleOpen] = useState(false)

	// CRU할 카테고리 상태값
	const [categories, categoryDispatch] = useReducer(categoryReducer,[])

	//* category 컴포넌트 내에서 선택된 카테고리를 가져오는 상태값
	const [selectedCategory, setSelectedCategory] = useState({})

	// 초기화면에서 공지사항 게시판이 바로 보이도록 하는 상태
	const [IsinitialCategory, setIsinitialCategory] = useState(true)

	//초기화면에 나올 카테고리 가져오기
	const [initialCategory, setInitialCategory] = useState({})

	useEffect(() => {
		const categoryName = '*공지사항*'
		Api.get(`category/${categoryName}`).then((res) => {

		setInitialCategory(res.data.category)
		})
	}, [])

    //로그인하지 않아도 게시글은 볼 수 있음 
    //로그인했을 때만 글작성할 수 있음

    //owner: 로그인한 사용자
    //owner.id: 로그인한 사용자 아이디

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
							//initialCategory 넣어야됨
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
