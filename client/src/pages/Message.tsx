import { FC } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Message: FC = () => {
  useRouteError();

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/posts', { replace: true });
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
        Coming soon!
      </Typography>
      <Typography variant="h5" paragraph>
        I apologize that the page is not yet ready for use, but I will
        definitely finish it
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
};

export default Message;
