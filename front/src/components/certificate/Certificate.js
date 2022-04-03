import { useState } from "react"
import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm"
import { Dialog, DialogTitle, DialogContent } from "@mui/material"

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
