import { FC, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CardMedia,
  IconButton,
} from '@mui/material';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import DeleteIcon from '@mui/icons-material/Delete';
import { postsService } from '../../services/posts.service';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks';
import { updatePost } from '../../store/posts/postSlice';
import { useGoBack } from '../../hooks/useGoBack';
import { useLocation } from 'react-router-dom';
import { UploadButton } from '..';

const FormEditPosts: FC = () => {
  const dispatch = useAppDispatch();
  const goBack = useGoBack();
  const { state } = useLocation();

  const [text, setText] = useState<string>(state.text || '');
  const [files, setFiles] = useState<File[]>(state.files || []);
  const [previews, setPreviews] = useState<string[] | null>(null);
  const [fileNames, setFileNames] = useState<string[]>(state.fileNames || []);
  const [existingImages, setExistingImages] = useState<string[]>(
    state.image || [],
  );

  const handleRemoveImage = async (imageName: string) => {
    try {
      await postsService.deleteFile(state.id, imageName);
      const updatedImages = existingImages.filter(
        (image) => image !== imageName,
      );
      setExistingImages(updatedImages);
      dispatch(updatePost({ ...state, image: updatedImages }));
      toast.success('File deleted successfully!');

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handlePostEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('text', text);
      files.forEach((file) => {
        formData.append('image', file);
      });
      const data = await postsService.updatePost(state.id, formData);
      dispatch(updatePost(data));
      goBack();
      setPreviews(null);
      setText('');
      setFiles([]);
      setFileNames([]);
      toast.success('Post updated!');

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      setFiles([...files, ...selectedFiles]);
      const selectedFileNames = selectedFiles.map((file) => file.name);
      setFileNames([...fileNames, ...selectedFileNames]);

      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews(previewUrls);
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
            {existingImages.map((image) => (
              <Box
                key={image}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '10px',
                }}
              >
                <CardMedia
                  sx={{ maxWidth: '10%' }}
                  component="img"
                  image={`http://localhost:3001/api/uploads/${image}`}
                  alt="Post image"
                />
                <IconButton onClick={() => handleRemoveImage(image)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
          {files.length > 0 && (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              Uploaded image
            </Typography>
          )}

          <Box
            component="section"
            sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
          >
            {previews?.map((preview) => (
              <CardMedia
                key={preview}
                component="img"
                image={preview || ''}
                sx={{
                  width: 65,
                  my: 2,
                }}
              />
            ))}
          </Box>
          <Box
            component="section"
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={2}
          >
            <UploadButton
              multiple={true}
              onChange={handleFileChange}
              buttonText="Upload image"
            />
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
              onClick={handlePostEdit}
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
