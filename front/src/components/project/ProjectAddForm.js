import React, { useState } from "react"

import { Box, TextField, Stack, Button } from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import { styled } from "@mui/material/styles"

import * as Api from "../../api"
import dayjs from "dayjs"

function ProjectAddForm({ portfolioOwnerId, setProjects, setClickAddBtn }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const from = dayjs(fromDate).format("YYYY-MM-DD")
        const to = dayjs(toDate).format("YYYY-MM-DD")

        const newProject = {
            userId: portfolioOwnerId,
            title,
            description,
            fromDate: from,
            toDate: to,
        }
        try {
            await Api.post("projects", newProject)

            const res = await Api.get("projects/lists", portfolioOwnerId)
            setProjects(res.data)
            setClickAddBtn(false)
        } catch (err) {
            alert(err.response.message)
        }
    }

    return (
        <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
            <Stack spacing={2}>
                <StyledTextField
                    required
                    label="프로젝트 제목"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <StyledTextField
                    required
                    label="상세내역"
                    onChange={(e) => setDescription(e.target.value)}
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

            <StyledButton
                variant="contained"
                type="submit"
                size="large"
                fullWidth
            >
                확인
            </StyledButton>
        </Box>
    )
}

export default ProjectAddForm

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
