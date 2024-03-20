import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { purple } from '@mui/material/colors';
import { blue } from '@mui/material/colors';

const ProgressCircle = ({ percentage }) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <LinearProgress color="secondary" sx={{ color: purple[500], backgroundColor: blue[500] }} className='h-[0.2rem]' />
        </Box>
        <div className="uploading-text">
          <span className="loading-dot">.</span>
          <span className="loading-dot">.</span>
          <span className="loading-dot">.</span>
          &nbsp;Uploading
        </div>
      </div>
    </>
  );
};

export default ProgressCircle;
