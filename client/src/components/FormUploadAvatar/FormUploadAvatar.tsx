import { Avatar, Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { UploadButton } from '..';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGoBack } from '../../hooks/useGoBack';
import { profileService } from '../../services/profile.service';
import { uploadedFile } from '../../store/profile/profileSlice';

const FormUploadAvatar: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const goBack = useGoBack();

  const handleChangeAvatar = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const data = await profileService.uploadFile(userId, files[0], 'avatar');

      dispatch(uploadedFile(data));
      setPreview(null);
      setFiles([]);
      setFileNames([]);
      goBack();
      toast.success('Avatar uploaded successfully');
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

        const file = selectedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
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
        <Avatar
          src={preview || ''}
          sx={{ width: 250, height: 250, margin: '0 auto' }}
        />
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
            flexDirection: 'column',
          }}
          mt={2}
        >
          <Button
            fullWidth
            onClick={handleChangeAvatar}
            type="submit"
            disabled={files.length === 0}
            variant="contained"
            color="success"
            sx={{ marginTop: 2, textTransform: 'none' }}
          >
            Upload avatar
          </Button>
          <Button
            fullWidth
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
  );
};

export default FormUploadAvatar;
