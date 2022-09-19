import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Footer = () => {
    return (
        <Box mt="80px" bgcolor="#fff3f4">
            <Stack gap="40px" alignItems="center" flexWrap="wrap" px="40px" pt="24px">
                <img src={Logo} alt="logo" width="80px" height="80px" />
            </Stack>
            <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} mt="41px" textAlign="center" pb="40px">
            Created by Rohith R
            </Typography>
        </Box>
    );
};

export default Footer;