import { Button, Modal } from "react-bootstrap"

function RemoveModal({show, handleClose, removeArticle}){

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{fontWeight: 'bolder'}}>경고창 알림!!</Modal.Title>
            </Modal.Header>

            <Modal.Body>정말로 삭제하시겠어요?</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    removeArticle()
                    handleClose()
                }}>
                    네
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    아니요!
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveModal
