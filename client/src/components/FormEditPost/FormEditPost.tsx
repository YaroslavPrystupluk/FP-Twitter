import { FC, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  styled,
  Avatar,
} from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postsService } from '../../services/posts.service';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPost, selectPosts } from '../../store/posts/postSlice';
import { useGoBack } from '../../hooks/useGoBack';
import { useParams } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormEditPosts: FC = () => {
  const [text, setText] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const goBack = useGoBack();
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  console.log(post);
  console.log(id);
  

  const handlePostAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('text', text);
      files.forEach((file) => {
        formData.append('image', file);
      });

      const data = await postsService.createPost(formData);
      dispatch(createPost(data));
      setText('');
      setFiles([]);
      setFileNames([]);
      toast.success('Post created!');

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
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{
        my: 2,
      }}
    >
      <Box
        component="section"
        boxShadow={5}
        sx={{
          p: 4,
          borderRadius: 1,
          border: '1px solid #E0E0E0',
          maxWidth: 700,
          margin: '0 auto',
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
          Edit post
        </Typography>
        <Box
          sx={{
            width: '15%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            margin: '32px auto',
          }}
        ></Box>

        <Box component="form" sx={{ width: '100%', padding: 0 }}>
          <TextField
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            label="What's on your mind"
            type="text"
            value={text}
          />
          <Box>
            {/* {posts.image.map((image) => (
              <CardMedia
                key={image}
                sx={{ paddingTop: '10px', maxWidth: '10%' }}
                component="img"
                image={`http://localhost:3001/api/uploads/${image}`}
                alt="Paella dish"
              />
            ))} */}
          </Box>

          <Box
            component="section"
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={2}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ textTransform: 'none' }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </Button>
            {fileNames.map((fileName, index) => (
              <Typography key={index} sx={{ marginLeft: 2 }}>
                {fileName}
              </Typography>
            ))}
            DB
          </Box>
          <Box
            component="section"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            mt={2}
          >
            <Button
              onClick={handlePostAdd}
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Edit post
            </Button>
            <Button
              onClick={goBack}
              variant="contained"
              color="error"
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEditPosts;
