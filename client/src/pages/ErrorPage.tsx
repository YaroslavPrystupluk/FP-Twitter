import { FC } from 'react'
import { useRouteError, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage: FC = () => {
   const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
   <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 3 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
}


export default ErrorPage
