import React, { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Col, Row } from "react-bootstrap"

import { UserStateContext } from "../App"
import * as Api from "../api"

import User from "./user/User"
import Educations from './education/Educations'
import Certificates from "./certificate/Certificates"
import Awards from "./award/Awards"
import Projects from "./project/Projects"

import Style from '../App.module.css'

function Portfolio() {
	const navigate = useNavigate()
	const params = useParams()

	const [portfolioOwner, setPortfolioOwner] = useState(null)
	const [isFetchCompleted, setIsFetchCompleted] = useState(false)
	const userState = useContext(UserStateContext);

	const fetchPorfolioOwner = async (ownerId) => {
		const res = await Api.get("user", ownerId)
		const ownerData = res.data
		setPortfolioOwner(ownerData)
		setIsFetchCompleted(true)
	};

	useEffect(() => {
		if (!userState.user) {
			navigate("/login", { replace: true })
			return;
		}

		if (params.userId) {
			const ownerId = params.userId
			fetchPorfolioOwner(ownerId)
		} else {
			const ownerId = userState.user.id
			fetchPorfolioOwner(ownerId)
		}
	}, [params, userState, navigate])

	if (!isFetchCompleted) {
		return "loading...";
	}

	return (
	<Container fluid>
		<Row xs={1} xxl={2}>
			<Col md="3" lg="3" xxl={3}>
				<User
					portfolioOwnerId={portfolioOwner.id}
					isEditable={portfolioOwner.id === userState.user?.id}
				/>
			</Col>
				
			<Col xxl={9} className={[Style.mvpBackground, 'mt-4', 'mb-4'].join(' ')}>
			
				<Educations 
					portfolioOwnerId={portfolioOwner.id}
					isEditable={portfolioOwner.id === userState.user?.id}/>
			
				<div className="mb-3"></div>
			
				<Awards 
					portfolioOwnerId={portfolioOwner.id}
					isEditable={portfolioOwner.id === userState.user?.id}/>

				<div className="mb-3"></div>

				<Certificates   
					portfolioOwnerId={portfolioOwner.id}
					isEditable={portfolioOwner.id === userState.user?.id}/>

				<div className="mb-3"></div>

				<Projects
					portfolioOwnerId={portfolioOwner.id}
					isEditable={portfolioOwner.id === userState.user?.id}/>
			</Col>
		</Row>
	</Container>
	);

}

export default Portfolio;
