import { useState } from "react"

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm"

function Certificate({ setCertificates, certificate, isEditable }) {
  const [isEditing, setIsEditing] = useState(false) // 편집 버튼 클릭 상태를 저장합니다.

  return (
    <>
      <CertificateCard
        setIsEditing={setIsEditing}
        certificate={certificate}
        isEditable={isEditable}
        setCertificates={setCertificates}
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
            자격증 편집
          </DialogTitle>

          <DialogContent>
            <CertificateEditForm
              setCertificates={setCertificates}
              currentCertificate={certificate}
              setIsEditing={setIsEditing}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
export default Certificate
