import React, { useEffect,useState } from "react"
import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AlertDialog from '../utils/AlertDialog'
import * as Api from "../../api";
import dayjs from "dayjs";

function ProjectCard({ project, setClickEditBtn, isEditable, setProjects }) {
    const [anchorEl, setAnchorEl] = useState(null); // Menu Element를 가리킵니다.
    const [isOpen, setIsOpen] = useState(null); // Menu Element의 Open 상태를 저장합니다.
    const [isDeleting, setIsDeleting] = useState(false); // 삭제 여부를 저장합니다.

    const [period, setPeriod] = useState('')
    let from = dayjs(project.fromDate)
    let to = dayjs(project.toDate)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(Boolean(event.currentTarget));
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false);
    };
    
    const DelBtnClickHandler = async (isDeleting) => {
        if (isDeleting) {
            // projects로 DELETE 요청을 보내 프로젝트를 삭제합니다.
            await Api.delete(`project/${project.id}`)

            setProjects(prev => prev.filter(item => item.id !== project.id))
        }
    }

    useEffect(() => {
        if (to.diff(from, "year") > 0){
            setPeriod(`${to.diff(from, "year")}년 동안`)
        } else if (to.diff(from, "month") > 0){
            setPeriod(`${to.diff(from, "month")}개월 동안`)
        } else {
            setPeriod(`${to.diff(from, "day")}일 동안`)
        }
    }, [project])

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
                    <IconButton onClick={handleClick} sx={{ float: "right", mb: 2 }}>
                        <MoreHorizIcon />
                    </IconButton>
                    {isOpen && (
                        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>
                                <Button
                                    onClick={() => setClickEditBtn((cur) => !cur)}
                                    startIcon={<EditIcon />}
                                >
                                    편집
                                </Button>
                            </MenuItem>
                            
                            <MenuItem onClick={handleClose}>
                                <Button
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => setIsDeleting(true)}
                                >
                                    삭제
                                </Button>
                            </MenuItem>
                        </Menu>
                    )}
                    {isDeleting && (
                        <AlertDialog checkDeleteComplete={DelBtnClickHandler} />
                    )}
                    </>
                )}
            </Grid>
        </Grid>
    );
}

export default ProjectCard;
