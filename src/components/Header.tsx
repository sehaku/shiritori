import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const Header = () => {
    return (
        <AppBar position='relative'>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                    しりとりドラゴンズお助けツール
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default Header
