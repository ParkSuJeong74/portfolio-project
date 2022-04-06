import React, { useState } from "react"
import { Box, TextField, Stack, Button } from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import { styled } from "@mui/material/styles"

import * as Api from "../../api"
import { TimeUtil } from "../../common/TimeUtil"

function ProjectEditForm({ project, setProjects, setClickEditBtn }) {
  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description)
  const [fromDate, setFromDate] = useState(new Date(project.fromDate))
  const [toDate, setToDate] = useState(new Date(project.toDate))

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const userId = project.userId

    const from = TimeUtil.getTime(fromDate).toISOString().split("T")[0]
    const to = TimeUtil.getTime(toDate).toISOString().split("T")[0]

    const editedProject = {
      userId,
      title,
      description,
      fromDate: from,
      toDate: to,
    }
    try {
      await Api.put(`project/${project.id}`, editedProject)
      const res = await Api.get("project/list", userId)
      setProjects(res.data)
      setClickEditBtn(false)
    } catch (err) {
      alert(err.response.data)
    }
  }

  return (
    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <StyledTextField
          required
          label="프로젝트 제목"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <StyledTextField
          required
          label="상세내역"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <DesktopDatePicker
            label="from"
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
            value={fromDate}
            onChange={(date) => setFromDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="to"
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
            value={toDate}
            onChange={(date) => setToDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <StyledButton variant="contained" type="submit" size="large" fullWidth>
        확인
      </StyledButton>
    </Box>
  )
}

export default ProjectEditForm

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
