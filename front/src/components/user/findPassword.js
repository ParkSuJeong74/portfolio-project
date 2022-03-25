import { Modal, Form, Button } from "react-bootstrap";



function findPassword({show, handleClose}){

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>비밀번호 찾기</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="inputEmail">
                    <Form.Control
                        type="text"
                        placeholder="이메일 입력"
                        
                    />
                    <button>인증번호 요청</button>
                </Form.Group>
                <Form.Group controlId="certificationNumber">
                    <Form.Control
                        type="text"
                        placeholder="인증번호 입력"
                        
                    />
                    <button variant="secondary" onClick={handleClose}>닫기</button>
                </Form.Group>


            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">닫기</Button>
                
            </Modal.Footer>
        </Modal>


    )
}

export default findPassword