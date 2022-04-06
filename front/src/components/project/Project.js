import React, { useState } from "react"

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import ProjectCard from "./ProjectCard"
import ProjectEditForm from "./ProjectEditForm"

function Project({ project, setProjects, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false)

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
          <DialogTitle
            sx={{
              fontFamily: "Elice Digital Baeum",
              fontWeight: 500,
              fontSize: "1.5rem",
            }}
          >
            <IconButton
              onClick={() => setClickEditBtn((cur) => !cur)}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                color: "#9e9e9e",
              }}
            >
              <CloseIcon />
            </IconButton>
            프로젝트 편집
          </DialogTitle>

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
  )
}

export default Project
