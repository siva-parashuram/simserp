import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function tableskeleton() {
  return (
    <Stack spacing={1}>     
    <Skeleton variant="text" height={60} />
      <Skeleton variant="rectangular" animation="wave" width={'100%'} height={350} />
    </Stack>
  );
}