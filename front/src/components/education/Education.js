import React, { useState } from "react"

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import EducationCard from "./EducationCard"
import EducationEditForm from "./EducationEditForm"

function Education({ education, isEditable, setEducations }) {
  const [isEditing, setIsEditing] = useState(false) // 편집 버튼 클릭 상태를 저장합니다.

  return (
    <>
      <EducationCard
        setIsEditing={setIsEditing}
        education={education}
        isEditable={isEditable}
        setEducations={setEducations}
      />
      {isEditing && (
        <Dialog open={isEditing} onClose={() => setIsEditing((cur) => !cur)}>
          <DialogTitle
            sx={{
              fontFamily: "Elice Digital Baeum",
              fontWeight: 500,
              fontSize: "1.5rem",
            }}
          >
            <IconButton
              onClick={() => setIsEditing((cur) => !cur)}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                color: "#9e9e9e",
              }}
            >
              <CloseIcon />
            </IconButton>
            학력 편집
          </DialogTitle>

          <DialogContent>
            <EducationEditForm
              setEducations={setEducations}
              currentEducation={education}
              setIsEditing={setIsEditing}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default Education
