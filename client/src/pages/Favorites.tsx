import { FC } from 'react'
import { Container, Box } from '@mui/material';
import { FavoritesList } from '../components';


const Favorites: FC = () => {
  return (
    <Container maxWidth="xl">
      <Box component="section">
        <FavoritesList />
      </Box>
    </Container>
  );
}

export default Favorites
