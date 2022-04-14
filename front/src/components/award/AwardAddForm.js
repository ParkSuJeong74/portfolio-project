import React, { useState } from "react"

import { Box, TextField, Stack, Button } from "@mui/material"
import { styled } from "@mui/material/styles"

import * as Api from "../../api"

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const newAward = {
        userId: portfolioOwnerId,
        title,
        description,
      }
      await Api.post("award/create", newAward)

      const res = await Api.get("award/list", portfolioOwnerId)
      setAwards(res.data)
      setIsAdding(false)
    } catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: "400px" }}
    >
      <Stack spacing={2}>
        <StyledTextField
          required
          label="수상내역"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <StyledTextField
          required
          label="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>

      <StyledButton variant="contained" type="submit" size="large" fullWidth>
        확인
      </StyledButton>
    </Box>
  )
}

export default AwardAddForm

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#08075C",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#08075C",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#08075C",
    },
  },
})

const StyledButton = styled(Button)({
  backgroundColor: "#08075C",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#2422b8",
  },
})