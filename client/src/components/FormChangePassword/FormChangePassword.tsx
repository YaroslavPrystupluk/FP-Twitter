import React, { FC, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { authService } from '../../services/auth.service';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FormChangePassword: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const { email } = useParams();

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    try {
      event.preventDefault();
      await authService.changePassword(email, {
        password,
        confirmPassword,
      });
      toast.success(`Password changed for ${email}!`);
      navigate('/login');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
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
          Change password
        </Typography>
        <Box
          sx={{
            width: '25%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            marginBottom: 4,
          }}
        ></Box>
        <Box
          component="form"
          onSubmit={handleChangePassword}
          sx={{ width: '100%' }}
        >
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
          <Typography mt={2} alignSelf="flex-start" fontSize={18}>
            Confirmed password <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            label="Confirmed password"
            type="password"
            value={confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, textTransform: 'none' }}
          >
            Change password
          </Button>
        </Box>
        <Typography
          sx={{
            padding: '25px 0 0 0',
          }}
        >
          {'Already have an account? '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                color: '#1976d2',
                '&:hover': {
                  color: '#7fbaf5',
                },
              }}
            >
              Sing in
            </Box>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default FormChangePassword;
