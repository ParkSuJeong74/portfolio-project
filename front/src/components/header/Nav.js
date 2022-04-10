import React from "react"

import { styled } from "@mui/material/styles"
import { Box, Button } from "@mui/material"
import { nav } from "../../common/styles"

function Nav() {
  const classes = nav()
  return (
    <Box className={classes.container}>
      <Box className={classes.btnContainer}>
        <StyledButton variant="contained" size="large">
          QnA 게시판
        </StyledButton>
        <StyledButton variant="contained" size="large">
          커뮤니티
        </StyledButton>
        <StyledButton variant="contained" size="large">
          정보게시판
        </StyledButton>
        <StyledButton variant="contained" size="large">
          유저리스트
        </StyledButton>
        <StyledButton variant="contained" size="large">
          SHOP
        </StyledButton>
        <StyledButton variant="contained" size="large">
          고객센터
        </StyledButton>
      </Box>
    </Box>
  )
}

export default Nav

const StyledButton = styled(Button)({
  fontWeight: 600,
  backgroundColor: "white",
  color: "#000d3e",
  margin: "0 20px",
  width: "100%",
  "&:hover": {
    backgroundColor: "#eee",
  },
  textTransform: "none",
})
