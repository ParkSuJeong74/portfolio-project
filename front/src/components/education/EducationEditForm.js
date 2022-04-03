import { useState } from "react"
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

function EducationEditForm({ setEducations, currentEducation, setIsEditing }) {
  const [school, setSchool] = useState(currentEducation.school) // 학교 이름을 저장할 상태입니다.
  const [major, setMajor] = useState(currentEducation.major) // 전공을 저장할 상태입니다.
  const [educationStatus, setEducationStatus] = useState(
    currentEducation.position,
  ) // 재학/졸업 여부를 저장할 상태입니다.

  const statusArr = ["재학중", "학사졸업", "석사졸업", "박사졸업"] // postion을 저장하는 배열입니다.

  const RadioBtnClickHandler = (e, value) => {
    setEducationStatus(value)
  }

  async function submitHandler(e) {
    e.preventDefault()
    e.stopPropagation()

    const userId = currentEducation.userId
    const editedEducation = {
      userId,
      school,
      major,
      position: educationStatus,
    }

    try {
      await Api.put(`education/${currentEducation.id}`, editedEducation)
      const res = await Api.get("education/list", userId)
      setEducations(res.data)
      setIsEditing(false)
    } catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <StyledTextField
          required
          label="학교 이름"
          onChange={(e) => setSchool(e.target.value)}
          value={school}
        />
        <StyledTextField
          required
          label="전공"
          onChange={(e) => setMajor(e.target.value)}
          value={major}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <RadioGroup
          name="radio-buttons-group"
          row
          value={educationStatus}
          onChange={RadioBtnClickHandler}
        >
          {statusArr.map((item, i) => (
            <FormControlLabel
              key={"position" + i}
              control={<Radio />}
              label={item}
              value={item}
            />
          ))}
        </RadioGroup>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <Button variant="contained" type="submit" sx={{ bgcolor: "#08075C" }}>
          확인
        </Button>{" "}
        <Button
          type="reset"
          onClick={() => setIsEditing(false)}
          variant="outlined"
        >
          취소
        </Button>{" "}
      </Stack>
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

export default EducationEditForm
