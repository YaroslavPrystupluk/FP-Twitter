import { FC, useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import { postsService } from '../../services/posts.service';
import { toast } from 'react-toastify';

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

const FormPosts: FC = () => {
  const [text, setText] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handlePostAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('text', text);
      files.forEach((file) => {
        formData.append('image', file);
      });

      await postsService.createPost(formData);
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
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      setFiles([...files, ...selectedFiles]);
      const selectedFileNames = selectedFiles.map((file) => file.name);
      setFileNames([...fileNames, ...selectedFileNames]);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: 4,
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
          minWidth: '50%',
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
        <Typography textAlign="center" mb={2}>
          Create posts
        </Typography>
        <Box
          sx={{
            width: '25%',
            height: '3px',
            backgroundColor: '#7fbaf5',
            marginBottom: 4,
          }}
        ></Box>
        <Box component="form" sx={{ width: '100%' }}>
          <Typography mt={2} alignSelf="flex-start" fontSize={18}>
            Enter text for posts <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            label="Enter text"
            type="text"
            value={text}
          />
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
              Create post
            </Button>
            <Button
              type="submit"
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

export default FormPosts;
