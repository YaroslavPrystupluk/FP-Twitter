import { FC } from 'react'
import { styled, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface IProps {
  buttonText: string
  multiple?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

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

const UploadButton: FC<IProps> = ({ buttonText, multiple, onChange }) => {
   return (
     <Button
       component="label"
       role={undefined}
       variant="contained"
       tabIndex={-1}
       startIcon={<CloudUploadIcon />}
       sx={{ textTransform: 'none' }}
     >
       {buttonText}
       <VisuallyHiddenInput
         type="file"
         multiple={multiple}
         onChange={onChange}
       />
     </Button>
   );
}

export default UploadButton
