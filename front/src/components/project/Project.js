import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Project({ project, setProjects, isEditable }) {

    const [clickEditBtn, setClickEditBtn] = useState(false);

    return (
        <>
            <ProjectCard
                project={project}
                setClickEditBtn={setClickEditBtn}
                isEditable={isEditable}
                setProjects={setProjects}
            />
            {clickEditBtn && (
                <Dialog
                    open={clickEditBtn}
                    onClose={() => setClickEditBtn((cur) => !cur)}
                >
                    <DialogTitle>프로젝트 편집</DialogTitle>
                    <DialogContent>
                        <ProjectEditForm
                            project={project}
                            setProjects={setProjects}
                            setClickEditBtn={setClickEditBtn}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default Project;
