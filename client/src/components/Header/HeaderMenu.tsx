import { FC, useState } from 'react'
import { Box, Button } from '@mui/material';

 const pages = ['Products', 'Pricing', 'Blog'];

const HeaderMenu: FC = () => {
  const [, setAnchorElNav] = useState<null | HTMLElement>(
    null,
  );
 

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
  {pages.map((page) => (
    <Button
      key={page}
      onClick={handleCloseNavMenu}
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      {page}
    </Button>
  ))}
</Box>
  )
}

export default HeaderMenu







