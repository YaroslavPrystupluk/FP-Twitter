import { FC, useCallback, useRef, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Collapse,
} from '@mui/material';
import { postsService } from '../../services/posts.service';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks';
import { createPost } from '../../store/posts/postSlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { UploadButton } from '..';

const FormAddPosts: FC = () => {
  const [text, setText] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: formRef, callback: () => setOpen(false) });

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
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const handleTextFieldClick = useCallback(() => {
    if (open) return;
    setOpen(!open);
  }, [open]);

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
        <Box component="form" sx={{ width: '100%', padding: 0 }} ref={formRef}>
          <TextField
            onClick={handleTextFieldClick}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            label="What's on your mind"
            type="text"
            value={text}
          />
          <Collapse in={open} timeout="auto" unmountOnExit>
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
                fullWidth
                onClick={handlePostAdd}
                type="submit"
                variant="contained"
                color="success"
                sx={{ marginTop: 2, textTransform: 'none' }}
              >
                Create post
              </Button>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Container>
  );
};

export default FormAddPosts;
