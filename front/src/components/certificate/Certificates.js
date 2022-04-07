import { useEffect, useState } from "react"

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
} from "@mui/material"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CloseIcon from "@mui/icons-material/Close"

import * as Api from "../../api"
import Certificate from "./Certificate"
import CertificateAddForm from "./CertificateAddForm"

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]) // 해당 유저의 자격증을 저장합니다.
  const [isAdding, setIsAdding] = useState(false) // 자격증 추가 버튼 클릭 상태를 저장합니다.

  useEffect(() => {
    Api.get("certificate/list", portfolioOwnerId)
      .then((res) => setCertificates(res.data))
      .catch((err) => alert(err.response.data))
  }, [portfolioOwnerId])

  return (
    <Card sx={{ marginBottom: "20px", borderRadius: "15px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              fontFamily: "Elice Digital Baeum",
              fontSize: "2em",
              color: "#08075C",
              fontWeight: 800,
            }}
          >
            자격증
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {certificates.map((certificate) => (
            <Certificate
              key={certificate.id}
              certificate={certificate}
              setCertificates={setCertificates}
              isEditable={isEditable}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {isEditable && (
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              style={{ color: "#08075C" }}
              aria-label="add-certificate"
              onClick={() => setIsAdding((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "56px", height: "56px" }} />
            </IconButton>
          </Box>

          {isAdding && (
            <Dialog open={isAdding} onClose={() => setIsAdding((cur) => !cur)}>
              <DialogTitle
                sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                }}
              >
                <IconButton
                  onClick={() => setIsAdding((cur) => !cur)}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    color: "#9e9e9e",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                자격증 추가
              </DialogTitle>
              <DialogContent>
                <CertificateAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setIsAdding={setIsAdding}
                  setCertificates={setCertificates}
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default Certificates
