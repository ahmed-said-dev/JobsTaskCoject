import React from 'react';

// Material UI
import { Box } from '@mui/material';

// Coject
import { Page } from 'coject';

// Theme
import useStyles from './Theme';

const Test = () => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Page title={''}>
                <Box className={classes.root}>
                    Test Page
                </Box>
            </Page>
        </React.Fragment>
    )
}

export default Test;