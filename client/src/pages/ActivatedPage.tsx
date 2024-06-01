import { FC } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ActivatedPage: FC = () => {
  useRouteError();

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/login', { replace: true });
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
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main' }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Yuor accaunt has been activated
      </Typography>
      <Typography variant="body1" paragraph>
        To go to your account, click the button:
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 3 }}
      >
        Go to login to account
      </Button>
    </Container>
  );
};

export default ActivatedPage;
