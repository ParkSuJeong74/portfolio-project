import {Modal, Button} from 'react-bootstrap'
import * as Api from '../../api'

function UnfollowModal({handleClose, show, myID, yourID}){

    async function unFollow(){
        const res = await Api.put(`user/follow/${myID}`, {userIdYour: yourID})
        console.log(res)
        handleClose()
        alert("언팔로우 되었습니다!!")
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>언팔로우 하시겠어요?</Modal.Title>
            </Modal.Header>

            <Modal.Body>다시 한번 생각해 주세요.. 제가 잘할게요..</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={unFollow}>
                네! 
                </Button>
                <Button variant="primary" onClick={handleClose}>
                아니요! 
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UnfollowModal