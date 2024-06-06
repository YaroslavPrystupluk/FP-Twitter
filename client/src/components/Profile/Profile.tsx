import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { UploadButton } from '..';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks';
import { postsService } from '../../services/posts.service';
import { createPost } from '../../store/posts/postSlice';
import { Link } from 'react-router-dom';

const Profile: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handlePostAdd = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      // formData.append('text', text);
      files.forEach((file) => {
        formData.append('image', file);
      });

      const data = await postsService.createPost(formData);
      dispatch(createPost(data));
      setFiles([]);
      setFileNames([]);
      toast.success('Post created!');

      setOpen(false);

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const selectedFiles = Array.from(event.target.files);
        setFiles([...files, ...selectedFiles]);
        const selectedFileNames = selectedFiles.map((file) => file.name);
        setFileNames([...fileNames, ...selectedFileNames]);
        toast.success('File uploaded!');
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };
  return (
    <Container maxWidth="xl" component="article" sx={{ mt: 0 }}>
      <Box component="section">
        <CardMedia
          component="img"
          height="350"
          image="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
          alt="profile"
          sx={{
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            mb: 2,
          }}
        />
      </Box>
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'center' },
          alignItems: 'center',
          position: { xs: 'absolute', md: 'relative' },
          top: { xs: 250, sm: 300, md: 0 },
          left: { xs: '50%', md: 0 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
          gap: { xs: 0, md: 4 },
        }}
      >
        <Avatar
          alt="Header Photo"
          src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
          sx={{
            width: { xs: 200, sm: 250 },
            height: { xs: 200, sm: 250 },
            m: { xs: 'auto', sm: 0 },
            border: '5px solid white',
          }}
        />

        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Username
          </Typography>

          <Typography variant="body1" paragraph>
            Email
          </Typography>

          <Typography variant="body1" paragraph>
            Subscriber 70
          </Typography>
          <AvatarGroup max={8}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'end',
          }}
        >
          <UploadButton
            multiple={false}
            onChange={handlePostAdd}
            buttonText="Upload background image"
          />
          {fileNames.map((fileName, index) => (
            <Typography key={index} sx={{ marginLeft: 2 }}>
              {fileName}
            </Typography>
          ))}

          <UploadButton
            multiple={false}
            onChange={handlePostAdd}
            buttonText="Upload avatar"
          />
          {fileNames.map((fileName, index) => (
            <Typography key={index} sx={{ marginLeft: 2 }}>
              {fileName}
            </Typography>
          ))}
          <Link
            to="/edit-profile"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', width: '100%' }}
            >
              Edit profile
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
