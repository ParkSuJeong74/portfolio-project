import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
import { DispatchContext } from '../../App';

import PasswordChangeModal from './PasswordChangeModal';

function LoginForm() {
    const navigate = useNavigate();
    const userDispatch = useContext(DispatchContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;

    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await Api.post('user/login', {
                email,
                password,
            });
            const user = res.data;
            const jwtToken = user.token;
            sessionStorage.setItem('userToken', jwtToken);

            userDispatch({
                type: 'LOGIN_SUCCESS',
                payload: user,
            });

            navigate('/', { replace: true });
        } catch (error) {
            alert(error.response.data)
        }
    };

    const [isModalActive, setIsModalActive] = useState(false);

    const handleModalClose = () => setIsModalActive(false);
    const handleModalShow = () => setIsModalActive(true);

    return (
        <>
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col lg={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="loginEmail">
                                <Form.Label>이메일 주소</Form.Label>
                                <Form.Control
                                    type="email"
                                    autoComplete="on"
                                    value={email}
                                    style={{
                                        border: 'solid 2px #DBC7FF',
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {!isEmailValid && (
                                    <Form.Text className="text-success">
                                        이메일 형식이 올바르지 않습니다.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="loginPassword" className="mt-3">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    autoComplete="on"
                                    value={password}
                                    style={{
                                        border: 'solid 2px #DBC7FF',
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {!isPasswordValid && (
                                    <Form.Text className="text-success">
                                        비밀번호는 4글자 이상입니다.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button
                                        className="me-5"
                                        variant="primary"
                                        type="submit"
                                        disabled={!isFormValid}
                                    >
                                        로그인
                                    </Button>
                                    <Button variant="light" onClick={() => navigate('/register')}>
                                        회원가입
                                    </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button
                                        style={{ backgroundColor: '#FF87D2', border: 'solid 2px' }}
                                        onClick={() => {
                                            handleModalShow();
                                        }}
                                    >
                                        비밀번호 찾기
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
            {isModalActive && (
                <PasswordChangeModal
                    onConfirm={handleModalClose}
                    onCancel={handleModalClose}
                />
            )}
        </>
    );
}

export default LoginForm;
