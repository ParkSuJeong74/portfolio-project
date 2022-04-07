import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { Button, Modal } from "react-bootstrap"
import * as Api from "../api"

function WithdrawModal({ show, handleClose }) {
  const navigate = useNavigate()
  const userState = useSelector((state) => state.user)

  async function withdraw() {
    console.log(userState.user?.id)
    await Api.delete(`user/${userState.user?.id}`)

    console.log("회원이 탈퇴되었습니다.")
    handleClose()
    navigate("/login")
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>경고창!!</Modal.Title>
      </Modal.Header>

      <Modal.Body>정말 회원 탈퇴하실 건가요???</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={withdraw}>
          네.
        </Button>
        <Button variant="primary" onClick={handleClose}>
          아니요!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default WithdrawModal
