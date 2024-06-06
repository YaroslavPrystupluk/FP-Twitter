import { FC, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import GoogleIcon from '@mui/icons-material/Google';
import { authService } from '../../services/auth.service';
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { setTokenToLocalStorage } from '../../helpers/localStorage.helpers';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/auth/authSlice';

const FormLogin: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = await authService.login({
        email,
        password,
        isRememberMe: rememberMe,
      });

      if (data) {
        setTokenToLocalStorage('accessToken', data.accessToken);
        dispatch(login(data));
        toast.success('Login was successful!');
        navigate('/posts');
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleLoginGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    try {
      event.preventDefault();
      const data = await authService.loginGoogle();

      if (data) {
        setTokenToLocalStorage('accessToken', data.accessToken);
        dispatch(login(data));
        toast.success('Login was successful!');
        navigate('/posts');
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        component="section"
        boxShadow={5}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1,
          border: '1px solid #E0E0E0',
          width: 400,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box>
            <FlutterDashIcon fontSize="large" color="primary" />
          </Box>
          <Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              clone twitter
            </Typography>
          </Box>
        </Box>
        <Typography textAlign="center" mb={2}>
          Sing in
        </Typography>
        <Box
          sx={{
            width: '25%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            marginBottom: 4,
          }}
        ></Box>
        <Button
          onClick={handleLoginGoogle}
          variant="outlined"
          sx={{
            borderColor: '#000000',
            width: '100%',
            marginBottom: 4,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <GoogleIcon sx={{ mr: 1 }} />
          <Typography
            sx={{
              flexGrow: 1,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Sing in with Google
          </Typography>
        </Button>
        <Box
          sx={{
            width: '25%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            marginBottom: 2,
          }}
        ></Box>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <Typography alignSelf="flex-start" fontSize={18}>
            E-Mail <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="email"
            type="email"
            value={email}
          />
          <Typography mt={2} alignSelf="flex-start" fontSize={18}>
            Password <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Password"
            type="password"
            value={password}
          />
          <NavLink to="/forgot-password" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                alignSelf: 'flex-start',
                padding: '25px 0 0 0',
                color: '#1976d2',
                '&:hover': {
                  color: '#7fbaf5',
                },
              }}
            >
              Forgot password?
            </Box>
          </NavLink>
          <FormControlLabel
            sx={{ alignSelf: 'flex-start', padding: '15px 0 0 0' }}
            control={<Checkbox onChange={handleRememberMe} name="remember" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, textTransform: 'none' }}
          >
            Singl In
          </Button>
        </Box>
        <Typography
          sx={{
            padding: '25px 0 0 0',
          }}
        >
          {'Do not have an account? '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                color: '#1976d2',
                '&:hover': {
                  color: '#7fbaf5',
                },
              }}
            >
              Sing up
            </Box>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default FormLogin;
