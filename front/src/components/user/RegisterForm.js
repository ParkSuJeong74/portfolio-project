import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import EmailAuthModal from './EmailAuthModal';

function RegisterForm() {
    const navigate = useNavigate();

    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState("");
    //useState로 인증코드 상태를 생성함.
    const [responseCode, setResponseCode] = useState(null);
    //useState로 인증된 email 상태를 생성함.
    const [isCheckedEmail, setIsCheckedEmail] = useState(false);
    //useState로 password 상태를 생성함.
    const [password, setPassword] = useState("");
    //useState로 confirmPassword 상태를 생성함.
    const [confirmPassword, setConfirmPassword] = useState("");
    //useState로 name 상태를 생성함.
    const [name, setName] = useState("");
    //useState로 nickname 상태를 생성함.
    const [nickname, setNickname] = useState("");

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    const isPasswordSame = password === confirmPassword;
    // 이름이 2글자 이상인지 여부를 확인함.
    const isNameValid = name.length >= 2;

    const isNicknameValid = nickname.length >= 2

    // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
    const isFormValid =
        isEmailValid && isPasswordValid && isPasswordSame && isNameValid && isNicknameValid;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 이메일 인증한 상태일때만 post 요청
            if (isCheckedEmail) {
                // "user/register" 엔드포인트로 post요청함.
                await Api.post("user/register", {
                    email,
                    password,
                    name,
                    nickname
                });
                // 로그인 페이지로 이동함.
                navigate("/login");
            } else {
                alert("이메일 인증을 진행해주세요.");
                window.location.reload();
            }

        } catch (error) {
            alert(error.response.data);
        }
    };

    const onClickEmailAuthentication = async () => {
        try {
            console.log('email 전송');
            const res = await Api.post('user/emailAuth', {
                email,
            });
            setResponseCode(res);
        } catch (error) {
            alert(error.response.data)
        }
    };

    const isCheckedEmailCallback = useCallback(() => {
        setIsCheckedEmail(true)
    });

    const [isModalActive, setIsModalActive] = useState(false);

    const handleModalClose = () => setIsModalActive(false);
    const handleModalShow = () => setIsModalActive(true);

    return (
        <>
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col lg={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="registerEmail" class="me-3">
                            <Form.Label>이메일 주소</Form.Label>

                            <Row>
                                <Col>
                                    <Form.Control
                                        type="email"
                                        autoComplete="off"
                                        value={email}
                                        style={{
                                            border: 'solid 2px #DBC7FF'
                                        }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>
                                
                                <Col>
                                    <Button
                                        style={{ backgroundColor: '#FF87D2', border: 'solid 2px' }}
                                        onClick={() => {
                                            handleModalShow();
                                            onClickEmailAuthentication();
                                        }}>
                                        이메일 인증
                                    </Button>
                                </Col>
                            </Row>


                            {!isEmailValid && (
                            <Form.Text className="text-success">
                                이메일 형식이 올바르지 않습니다.
                            </Form.Text>
                            )}
                            
                            
                        </Form.Group>

                        <Form.Group controlId="registerPassword" className="mt-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete="off"
                                value={password}
                                style={{
                                    border: 'solid 2px #DBC7FF'
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!isPasswordValid && (
                            <Form.Text className="text-success">
                                비밀번호는 4글자 이상으로 설정해 주세요.
                            </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="registerConfirmPassword" className="mt-3">
                            <Form.Label>비밀번호 재확인</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete="off"
                                value={confirmPassword}
                                style={{
                                    border: 'solid 2px #DBC7FF'
                                }}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {!isPasswordSame && (
                            <Form.Text className="text-success">
                                비밀번호가 일치하지 않습니다.
                            </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="registerName" className="mt-3">
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                value={name}
                                style={{
                                    border: 'solid 2px #DBC7FF'
                                }}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {!isNameValid && (
                            <Form.Text className="text-success">
                                이름은 2글자 이상으로 설정해 주세요.
                            </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="registerName" className="mt-3">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                value={nickname}
                                style={{
                                    border: 'solid 2px #DBC7FF'
                                }}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            {!isNicknameValid && (
                            <Form.Text className="text-success">
                                닉네임은 2글자 이상으로 설정해 주세요.
                            </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group as={Row} className="mt-3 text-center">
                            <Col sm={{ span: 20 }}>
                                <Button  variant="primary" type="submit" disabled={!isFormValid}>
                                    회원가입

                                    </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button variant="light" onClick={() => navigate("/login")}>
                                        로그인하기
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {isModalActive && (
                <EmailAuthModal
                    onConfirm={handleModalClose}
                    onCancel={handleModalClose}
                    responseCode={responseCode}
                    isCheckedEmailCallback={isCheckedEmailCallback}
                />
            )}
        </>
    );
}

export default RegisterForm;
