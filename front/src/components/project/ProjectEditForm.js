import React, { useState } from "react"
import { Box, TextField, Stack, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import * as Api from "../../api"
import {TimeUtil} from '../../common/TimeUtil'

function ProjectEditForm({ project, setProjects, setClickEditBtn  }) {

    const [title, setTitle] = useState(project.title)

    const [description, setDescription] = useState(project.description);

    const [fromDate, setFromDate] = useState(
        new Date(project.fromDate)
    )
    const [toDate, setToDate] = useState(
        new Date(project.toDate)
    )

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const userId = project.userId;

        const from = (TimeUtil.getTime(fromDate)).toISOString().split('T')[0]
        const to = (TimeUtil.getTime(toDate)).toISOString().split('T')[0]

        const editedProject = await Api.put(`project/${project.id}`, {
            userId,
            title,
            description,
            fromDate: from,
            toDate: to
        })

        setProjects((prev) => prev.map((item) => {
            return item.id === project.id
                ? (editedProject.data)
                : (item)
        }))

        setClickEditBtn(false)
    }

    return (
        <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
            <Stack spacing={2}>
                <TextField
                    required
                    label="프로젝트 제목"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={title}
                />
                <TextField
                    required
                    label="상세내역"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
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
                    onClick={() => setClickEditBtn(false)}
                    variant="outlined"
                    sx={ButtonStyle.cancel}
                >
                    취소
                </Button>{" "}
            </Stack>
        </Box>
    )
}

export default ProjectEditForm;

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
