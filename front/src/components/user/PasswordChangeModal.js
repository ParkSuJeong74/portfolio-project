import * as Api from '../../api';
import { useState } from 'react';
import { Col, Row, Form, Modal } from 'react-bootstrap';

const PasswordChangeModal = ({ onConfirm, onCancel }) => {
  const [email, setEmail] = useState('');
  const [responseCode, setResponseCode] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [isCodeMatched, setIsCodeMatched] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onCheckCodeMatch = () => {
    if (responseCode.data === Number(inputCode)) setIsCodeMatched(true);
  };

  const onClickPasswordAuthentication = async () => {
    try {
      console.log('email 전송');
      const res = await Api.post('password/emailAuth', {
        email,
      });
      setResponseCode(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickPasswordAuthenticationConfirm = async () => {
    try {
      console.log('email 확인');
      await Api.put('password/change', {
        email,
        newPassword,
        confirmPassword,
      });
      onConfirm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 찾기</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="inputEmail">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="이메일 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col>
              <button onClick={onClickPasswordAuthentication} className="mt-2">
                인증번호 요청
              </button>
            </Col>
          </Row>
        </Form.Group>
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
              <button onClick={onCheckCodeMatch} className="mt-4">
                확인
              </button>
            </Col>
          </Row>
        </Form.Group>
        {isCodeMatched && (
          <>
            <Form.Group controlId="password">
              <Row>
                <Col>
                  <Form.Control
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="새 비밀번호 입력"
                    className="mt-3"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="passwordConfirm">
              <Row>
                <Col>
                  <Form.Control
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="새 비밀번호 확인"
                    className="mt-3"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <button
                  onClick={() => {
                    if (newPassword === confirmPassword)
                        onClickPasswordAuthenticationConfirm();
                  }}
                  type="submit"
                  className="mvpConfirmButton me-3"
                >
                  확인
                </button>
                <button onClick={onCancel} className="mvpCancelButton">
                  취소
                </button>
              </Col>
            </Form.Group>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PasswordChangeModal;