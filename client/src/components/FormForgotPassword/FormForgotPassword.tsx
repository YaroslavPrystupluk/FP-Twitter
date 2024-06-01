import { FC, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { toast } from 'react-toastify';

const FormForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>('');
  const handleforgotPassword = async () => {
    try {
      await authService.forgotPassword(email);

      toast.success(`Please, confirm your email! ${email}`);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
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
          Recover your account
        </Typography>
        <Box
          sx={{
            width: '25%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            marginBottom: 4,
          }}
        ></Box>
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

        <Button
          onClick={handleforgotPassword}
          fullWidth
          variant="contained"
          sx={{ marginTop: 2, textTransform: 'none' }}
        >
          Submit
        </Button>
        <Typography
          sx={{
            padding: '25px 0 0 0',
          }}
        >
          {'Remember your credentials? '}
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

export default FormForgotPassword;
