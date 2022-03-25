import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router"
import { UserStateContext } from "../App"
import * as Api from '../api'

function WithdrawModal({show, handleClose}){
    const userState = useContext(UserStateContext)
    const navigate = useNavigate()

    async function withdraw(){
        console.log(userState.user?.id)
        await Api.delete(`user/${userState.user?.id}`)

        console.log('회원이 탈퇴되었습니다.')
        handleClose()
        // 로그인 페이지로 이동함.
        navigate("/login");
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