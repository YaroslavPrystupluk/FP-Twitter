import { FC, useState } from 'react';
import {
  Autocomplete,
  Stack,
  TextField,
  alpha,
  styled,
} from '@mui/material';
import { searchService } from '../../services/search.service';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../types/userTypes';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
    '& .MuiFocused input-label': {
      color: 'white',
    },
  },
}));


interface UserOption {
  id: string;
  email: string;
}

const SearchComponent: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<UserOption[]>([]);
  const navigate = useNavigate();

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery) {
      const data = await searchService.searchUsers(newQuery);
      setOptions(
        data.map((user: IUser) => ({ id: user.id, email: user.email })),
      );
    } else {
      setOptions([]);
      setQuery('');
    }
  };

  const handleOptionSelect = (
    event: React.SyntheticEvent,
    value: string | UserOption,
  ) => {
    if (typeof value === 'string' || value === null) {
      return;
    }

    const selectedUser = options.find((user) => user.email === value.email);

    if (selectedUser) {
      navigate(`/user/${selectedUser.id}`);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300, px: 1, py: 1 }}>
      <Search>
        <Autocomplete
          noOptionsText="Enter the user's email address"
          popupIcon={<SearchIcon sx={{ color: '#ffffff' }} />}
          disableClearable
          options={options}
          getOptionLabel={(option) => option.email}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleOptionSelect}
          filterOptions={(options) => options.slice(0, 10)}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              placeholder="Search"
              label="Search"
              focused={false}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                onChange: handleInputChange,
                value: query,
              }}
            />
          )}
        />
      </Search>
    </Stack>
  );
};

export default SearchComponent;
