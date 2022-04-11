import React, { useEffect, useState } from "react"

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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import * as Api from "../../api"
import Award from "./Award"
import AwardAddForm from "./AwardAddForm"

function Awards({ portfolioOwnerId, isEditable }) {
  const [awards, setAwards] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    Api.get("award/list", portfolioOwnerId).then((res) => setAwards(res.data))
  }, [portfolioOwnerId])

  return (
    <Card sx={{ marginBottom: "20px", borderRadius: "15px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{padding: 0}}
        >
          <Box 
            sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
            }}>
          
            <Box sx={{ display: 'flex', marginLeft: '20px'}}>
              <EmojiEventsIcon sx={{fontSize: "2.8em"}}/>
              <Typography
                sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontSize: "1.8em",
                  color: "#08075C",
                  fontWeight: 800,
                  marginLeft: "15px",
                }}
              >
                Award
              </Typography>
            </Box>
          
            <Typography
              sx={{
                width: '500px',
                height: '20px',
                backgroundColor: '#6D55FF',
              }} />
        </Box>

        </AccordionSummary>
        <AccordionDetails>
          {awards &&
            awards.map((award) => (
              <Award
                key={award.id}
                award={award}
                setAwards={setAwards}
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
              aria-label="add-award"
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
                수상이력 추가
              </DialogTitle>
              <DialogContent>
                <AwardAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setIsAdding={setIsAdding}
                  setAwards={setAwards}
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default Awards
