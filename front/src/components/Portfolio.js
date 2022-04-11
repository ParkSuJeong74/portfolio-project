import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import * as Api from "../api"
import User from "./user/User"
import Educations from "./education/Educations"
import Certificates from "./certificate/Certificates"
import Awards from "./award/Awards"
import Projects from "./project/Projects"
import PortfolioSection from './PortfolioSection'

import { Container, Grid } from "@mui/material"
import Style from "../App.module.css"

function Portfolio() {
  const navigate = useNavigate()
  const userState = useSelector((state) => state.user)
  const params = useParams()

  const [portfolioOwner, setPortfolioOwner] = useState(null)
  const [isFetchCompleted, setIsFetchCompleted] = useState(false)

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("user", ownerId)
    const ownerData = res.data
    setPortfolioOwner(ownerData)
    setIsFetchCompleted(true)
  }

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true })
      return
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
    return "loading..."
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>

        <Grid item md={3} xs={12}>
          <User
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
        </Grid>
        <Grid
          item
          md={9}
          xs={12}
          className={[Style.mvpBackground, "mt-4", "mb-4"].join(" ")}
        >
          <PortfolioSection />

          <Educations
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />

          <Awards
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />

          <Certificates
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />

          <Projects
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Portfolio
