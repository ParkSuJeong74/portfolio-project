import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Education({ education, isEditable, setEducations }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.

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
          <DialogTitle>학력 편집</DialogTitle>
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
  );
}

export default Education;
