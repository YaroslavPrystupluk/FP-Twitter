import React, { FC, useState } from 'react';
import { IPost } from '../../types/postsType';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { postsService } from '../../services/posts.service';
import { useAppDispatch } from '../../store/hooks';
import { deletePost } from '../../store/posts/postSlice';
import { Link } from 'react-router-dom';

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async (id: string) => {
    try {
      await postsService.deletePost(id);
      dispatch(deletePost(id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          maxWidth: 700,
          margin: '0 auto',
          border: '2px solid #ccc',
          my: 4,
          px: 2,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={post.user?.avatar}
            ></Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                style={{ width: '100%' }}
              >
                <Link to={`/posts/update/${post.id}`} style={{textDecoration: 'none', color: '#000000dd'}}>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit post" />
                </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleDeletePost(post.id);
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Delete post" />
                </MenuItem>
              </Menu>
            </>
          }
          title={post.user?.displayname}
          subheader={new Date(post.createdAt).toLocaleDateString()}
        />

        {post.image.map((image) => (
          <CardMedia
            key={image}
            sx={{ paddingTop: '10px' }}
            component="img"
            image={`http://localhost:3001/api/uploads/${image}`}
            alt="Paella dish"
          />
        ))}

        <CardContent>
          <Typography paragraph>{post.text}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Post;
