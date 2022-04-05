import React, { useState } from "react"

import { Box, TextField, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import * as Api from "../../api"
import dayjs from "dayjs"

function ProjectAddForm({ portfolioOwnerId, setProjects, setClickAddBtn }) {

    const [title, setTitle] = useState("")

    const [description, setDescription] = useState("")

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        let from = dayjs(fromDate)
        let to = dayjs(toDate)

        from = dayjs(fromDate).format("YYYY-MM-DD")
        to = dayjs(toDate).format("YYYY-MM-DD")

        const newProject = await Api.post("project/create", {
            userId: portfolioOwnerId,
            title,
            description,
            fromDate: from,
            toDate: to
        })

        setProjects((prev) =>  [...prev, newProject.data])

        setClickAddBtn(false);
    }

    return (
        <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
            <Stack spacing={2}>
                <TextField
                    required
                    label="프로젝트 제목"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
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
                    maxDate={toDate}
                    onChange={(date) => setFromDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="to"
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    value={toDate}
                    minDate={fromDate}
                    onChange={(date) => setToDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                />
                </Stack>
            </LocalizationProvider>

            <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, justifyContent: "center" }}
            >
                <Button variant="contained" type="submit" sx={ButtonStyle.confirm} disableElevation disableRipple>
                    확인
                </Button>{" "}
                <Button
                    type="reset"
                    onClick={() => setClickAddBtn(false)}
                    variant="outlined"
                    sx={ButtonStyle.cancel}
                >
                    취소
                </Button>{" "}
            </Stack>
        </Box>
    )
}

export default ProjectAddForm

const ButtonStyle = {
    confirm : { bgcolor: '#D0CE7C', color: '#31311C',
        ':hover': {
            bgcolor: '#b1b068',
            color: 'white',
        }
    },
    cancel: { border: 'solid 1px #db3f2b', color: '#db3f2b', 
        ':hover': {
            bgcolor: '#bd3421',
            color: 'white',
            border: '0px'
        }
    },
}
