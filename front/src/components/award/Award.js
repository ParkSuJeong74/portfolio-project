import React, { useState } from "react"

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import AwardCard from "./AwardCard"
import AwardEditForm from "./AwardEditForm"

function Award({ award, setAwards, isEditable }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <AwardCard
        setIsEditing={setIsEditing}
        award={award}
        isEditable={isEditable}
        setAwards={setAwards}
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
            수상이력 편집
          </DialogTitle>
          <DialogContent>
            <AwardEditForm
              setAwards={setAwards}
              currentAward={award}
              setIsEditing={setIsEditing}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default Award
