import { FC } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import GoogleIcon from '@mui/icons-material/Google';

const FormLogin: FC = () => {
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
        <Typography alignSelf="flex-start" fontSize={18}>
          E-Mail <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="email"
          type="email"
        />
        <Typography mt={2} alignSelf="flex-start" fontSize={18}>
          Password <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
        />
        <Typography
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
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 2, textTransform: 'none' }}
        >
          Singl In
        </Button>
        <Typography
          sx={{
            padding: '25px 0 0 0',
          }}
        >
          {'Don\'t have an account? '}
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
        </Typography>
      </Box>
    </Container>
  );
};

export default FormLogin;
