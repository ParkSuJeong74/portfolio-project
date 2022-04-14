import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import * as Api from "../../api"
import dayjs from "dayjs"

function ProjectCard({ project, setClickEditBtn, isEditable, setProjects }) {
    const userState = useSelector((state) => state.user)
    const [anchorEl, setAnchorEl] = useState(null) // Menu Element를 가리킵니다.
    const [isOpen, setIsOpen] = useState(null) // Menu Element의 Open 상태를 저장합니다.
    const [period, setPeriod] = useState("")

    const from = dayjs(project.fromDate)
    const to = dayjs(project.toDate)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setIsOpen(Boolean(event.currentTarget))
    }

    const handleClose = () => {
        setAnchorEl(null)
        setIsOpen(false)
    }

    const DelBtnClickHandler = async () => {
        try {
            // projects로 DELETE 요청을 보내 프로젝트를 삭제합니다.
            await Api.delete(`projects/${project.id}`)

            const res = await Api.get("projects/lists", userState.user.id)
            setProjects(res.data)
        } catch (error) {
            alert(error.response.message)
        }
    }

    useEffect(() => {
        if (to.diff(from, "year") > 0) {
            setPeriod(`${to.diff(from, "year")}년 동안`)
        } else if (to.diff(from, "month") > 0) {
            setPeriod(`${to.diff(from, "month")}개월 동안`)
        } else {
            setPeriod(`${to.diff(from, "day")}일 동안`)
        }
    }, [from, to])

    return (
        <Grid container spacing={2}>
            <Grid item xs={10}>
                <p style={{ marginBottom: 0 }}>{project.title}</p>
                <p className="text-muted">
                    {project.description} <br />
                    {project.fromDate} ~ {project.toDate} ({period})
                </p>
            </Grid>
            <Grid item xs={2}>
                {isEditable && (
                    <>
                        <IconButton
                            onClick={handleClick}
                            sx={{ float: "right", mb: 2 }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        {isOpen && (
                            <Menu
                                anchorEl={anchorEl}
                                open={isOpen}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Button
                                        onClick={() =>
                                            setClickEditBtn((cur) => !cur)
                                        }
                                        startIcon={<EditIcon />}
                                    >
                                        편집
                                    </Button>
                                </MenuItem>

                                <MenuItem onClick={handleClose}>
                                    <Button
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={DelBtnClickHandler}
                                    >
                                        삭제
                                    </Button>
                                </MenuItem>
                            </Menu>
                        )}
                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default ProjectCard
