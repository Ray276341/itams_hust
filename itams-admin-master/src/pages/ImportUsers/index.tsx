import { Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import UserTable from './UserTable';
import Papa, { ParseResult } from 'papaparse';
import { NewUser } from '../../interface/interface';
import { toast } from 'react-toastify';
import { importUser } from '../../api/user';

function ImportUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<NewUser[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    Papa.parse(event?.target?.files[0] as File, {
      complete: (result: ParseResult<NewUser>) => setData(result.data),
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await importUser(data);
      toast.success('Import successfully');
    } catch (err: any) {
      console.log('Import User', err);
      toast.error(err.response.data.message ?? 'Failed to import');
    }
    setLoading(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '16px',
        }}
      >
        <Typography variant="h5">Import User</Typography>
        <Box>
          <input
            className="csv-input"
            type="file"
            name="file"
            onChange={handleChange}
          />
          <LoadingButton
            loading={loading}
            sx={{
              background: '#007aff',
              borderRadius: '5px',
              textTransform: 'none',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 14,
              '&:hover': {
                background: '#005eff',
              },
            }}
            onClick={handleClick}
          >
            Import
          </LoadingButton>
        </Box>
      </Box>
      <UserTable rows={data} />
    </Box>
  );
}

export default ImportUsers;
