import * as Api from '../../api';
import { useState } from 'react';
import { Col, Row, Form, Modal } from 'react-bootstrap';

const EmailAuthModal = ({ onConfirm, onCancel, responseCode, isCheckedEmailCallback }) => {
    const [inputCode, setInputCode] = useState('');

    const onCheckCodeMatch = () => {
        if (responseCode.data === Number(inputCode)) {
            onClickEmailAuthenticationConfirm()
        }
        else alert("인증번호가 일치하지 않습니다.")
    };

    const onClickEmailAuthenticationConfirm = async () => {
        try {
          console.log('email 인증 완료');
          isCheckedEmailCallback();
          onConfirm();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <Modal show={true} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>이메일 인증</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form.Group controlId="certificationNumber">
            <Row>
                <Col>
                <Form.Control
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    type="text"
                    placeholder="인증번호 입력"
                    className="mt-3"
                />
                </Col>
                <Col>
                <button onClick={() => {
                    onCheckCodeMatch();
                }} type="submit" className="mt-4">
                    확인
                </button>
                </Col>
            </Row>
            </Form.Group>
        </Modal.Body>
        </Modal>
    );
};

export default EmailAuthModal;