import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {

    const [projects, setProjects] = useState([]);
    const [clickAddBtn, setClickAddBtn] = useState(false);

    useEffect(() => {
        Api.get("project/list", portfolioOwnerId)
            .then((res) => {
                setProjects(res.data)
            });
    }, [portfolioOwnerId]);

    return (
        <Card sx={{ marginBottom: "20px" }}>
            <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography sx={{
                    fontFamily: "Elice Digital Baeum",
                    fontSize: "24px",
                    color: "#616161",
                    fontWeight: 500,
                    }}>프로젝트</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {projects.map((project) => (
                        <Project
                            key={project.id}
                            project={project}
                            setProjects={setProjects}
                            isEditable={isEditable}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {isEditable && (
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                            style={{ color: "#C7A27C" }}
                            aria-label="add-education"
                            onClick={() => setClickAddBtn((cur) => !cur)}
                        >
                        <AddCircleRoundedIcon sx={{ width: "48px", height: "48px" }} />
                        </IconButton>
                    </Box>

                    {clickAddBtn && (
                        <Dialog
                            open={clickAddBtn}
                            onClose={() => setClickAddBtn((cur) => !cur)}
                        >
                            <DialogTitle>프로젝트 추가</DialogTitle>
                            <DialogContent>
                                <ProjectAddForm
                                    portfolioOwnerId={portfolioOwnerId}
                                    setClickAddBtn={setClickAddBtn}
                                    setProjects={setProjects}
                                />
                            </DialogContent>
                        </Dialog>
                    )}
                </CardContent>
            )}
        </Card>
    );
}

export default Projects;
