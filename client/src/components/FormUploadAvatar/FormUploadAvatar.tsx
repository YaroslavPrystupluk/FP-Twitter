import { Box, Button, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { UploadButton } from '..';
import { toast } from 'react-toastify';
import { postsService } from '../../services/posts.service';
import { useAppDispatch } from '../../store/hooks';
import { createPost } from '../../store/posts/postSlice';

const FormUploadAvatar: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handlePostAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('image', file);
      });

      const data = await postsService.createPost(formData);
      dispatch(createPost(data));
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
      <Box component="form" sx={{ width: '100%', padding: 0 }}>
        <Box
          component="section"
          sx={{ display: 'flex', alignItems: 'center' }}
          mt={2}
        >
          <UploadButton
            multiple={false}
            onChange={handleFileChange}
            buttonText="Upload avatar"
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
            Upload avatar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormUploadAvatar;
