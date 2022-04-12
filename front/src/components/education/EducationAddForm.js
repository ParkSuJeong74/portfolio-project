import React, { useState } from "react"
import {
  Box,
  TextField,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material"
import { styled } from "@mui/material/styles"

import * as Api from "../../api"

function EducationAddForm({ setIsAdding, portfolioOwnerId, setEducations }) {
  const [school, setSchool] = useState("") // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState("") // 전공을 저장할 상태입니다.
  const [educationStatus, setEducationStatus] = useState("재학중") // 재학/졸업 여부를 저장할 상태입니다.

  // postion을 저장하는 배열입니다.
  const statusArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"]

  // radio button 클릭에 따라 position을 저장합니다.
  const RadioBtnClickHandler = (e, value) => {
    setEducationStatus(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const newEducation = {
        userId: portfolioOwnerId,
        school,
        major,
        position: educationStatus,
      }
      await Api.post("education/create", newEducation)

      const res = await Api.get("education/list", portfolioOwnerId)
      setEducations(res.data)
      setIsAdding(false)
    } catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <StyledTextField
          required
          label="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <StyledTextField
          required
          label="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <RadioGroup
          defaultValue="재학중"
          name="radio-buttons-group"
          row
          onChange={RadioBtnClickHandler}
        >
          {statusArr.map((item, i) => (
            <FormControlLabel
              key={"educationStatus" + i}
              control={<StyledRadioBtn />}
              label={item}
              value={item}
            />
          ))}
        </RadioGroup>
      </Stack>
      <StyledButton variant="contained" type="submit" size="large" fullWidth>
        확인
      </StyledButton>
    </Box>
  )
}
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

const StyledRadioBtn = styled(Radio)({
  "&.Mui-checked": {
    color: "#08075C",
  },
})

const StyledButton = styled(Button)({
  backgroundColor: "#08075C",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#2422b8",
  },
})
export default EducationAddForm