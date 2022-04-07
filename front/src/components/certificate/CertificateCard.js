import React, { useState } from "react"
import { useSelector } from "react-redux"

import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import * as Api from "../../api"

function CertificateCard({
  isEditable,
  setIsEditing,
  certificate,
  setCertificates,
}) {
  const userState = useSelector((state) => state.user) // 현재 로그인된 유저의 정보를 가져옵니다.
  const [anchorEl, setAnchorEl] = useState(null) // Menu Element를 가리킵니다.
  const [isOpen, setIsOpen] = useState(null) // Menu Element의 Open 상태를 저장합니다.

  const userId = userState.user.id // 자격증 리스트를 갱신하기 위해 유저 아이디를 저장합니다.

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(Boolean(event.currentTarget))
  }
  const handleClose = () => {
    setAnchorEl(null)
    setIsOpen(false)
  }

  const removeCertificate = async () => {
    try {
      // certificate로 DELETE 요청을 보내 학력을 삭제합니다.
      await Api.delete("certificate", certificate.id)

      const res = await Api.get("certificate/list", userId)
      setCertificates(res.data)
    } catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <p style={{ marginBottom: 0 }}>{certificate.title}</p>
        <p className="text-muted">
          {certificate.description} <br />
          {certificate.whenDate}
        </p>
      </Grid>
      <Grid item xs={2}>
        {isEditable && (
          <>
            <IconButton onClick={handleClick} sx={{ float: "right", mb: 2 }}>
              <MoreHorizIcon />
            </IconButton>
            {isOpen && (
              <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Button
                    onClick={() => setIsEditing((cur) => !cur)}
                    startIcon={<EditIcon />}
                  >
                    편집
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={removeCertificate}
                  >
                    삭제
                  </Button>
                </MenuItem>
              </Menu>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}
export default CertificateCard
