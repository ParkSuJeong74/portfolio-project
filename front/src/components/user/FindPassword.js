import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Api from '../../api';
import { useNavigate } from 'react-router';

const theme = createTheme();

function FindPassword(){
    const [email, setEmail] = useState('');
    const [responseCode, setResponseCode] = useState(null);
    const [inputCode, setInputCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const onClickPasswordAuthentication = async () => {
        try {
            console.log('email 전송');
            const res = await Api.post('password/emailAuth', {
                email,
            });
            setResponseCode(res);
            alert("인증번호가 발송되었습니다. 메일을 확인해주세요.")
        } catch (error) {
            alert(error.response.data)
        }
    };

    const onCheckCodeMatch = () => {
        if (responseCode.data === Number(inputCode)) {
            alert("인증번호가 일치합니다. 새로운 비밀번호를 생성해주세요.")
            document.querySelector('#newPassword').focus()
        }
        else alert("인증번호가 일치하지 않습니다.")
    };

    const onClickPasswordAuthenticationConfirm = async () => {
        try {
            console.log('email 확인');
            await Api.put('password/change', {
                email,
                newPassword,
                confirmPassword,
            });
            alert("비밀번호가 성공적으로 변경되었습니다.")
            navigate('/')

        } catch (error) {
            alert(error.response.data)
        }
    };
    
    return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 17,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, p:0.6, bgcolor: '#08075C' }} src="pupa-logo-no-bg.png"/>

            <Typography component="h1" variant="h5">
                Change Password
            </Typography>

            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            name="email"
                            fullWidth
                            label="Email"
                            value={email}
                            autoFocus
                            onChange={(e) => {
                                setEmail(e.target.value)
                                console.log(email)
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt:0.6, bgcolor: '#08075C',color: 'white', p: 1.2}}
                            onClick={onClickPasswordAuthentication}
                        >
                            이메일 인증
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            name="certificationNumber"
                            fullWidth
                            label="Certification Number"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 0.6, bgcolor: '#08075C', color: 'white', p: 1.2}}
                            onClick={onCheckCodeMatch}
                            >
                            확인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="newPassword"
                            name="newPassword"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="passwordConfirm"
                            label="Password Confirm"
                            type="password"
                            autoComplete="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                    
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, bgcolor: '#08075C',color: 'white', p:1 }}
                    onClick={() => {
                        if (newPassword === confirmPassword)
                            onClickPasswordAuthenticationConfirm();
                    }}
                >
                    비밀번호 변경
                </Button>
                <Grid container justifyContent="flex-column" spacing={1}>
                    <Grid item > 
                        <Link href="/register" variant="body2" sx={{color: '#08075C'}}>
                            Create account
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/login" variant="body2" sx={{color: '#08075C'}}>
                            Go Sign In
                        </Link>
                    </Grid>
                </Grid>
            
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
    );
    
}
export default FindPassword;