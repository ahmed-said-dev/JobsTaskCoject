import React from 'react';

// Material UI
import { Box } from '@mui/material';

// Coject
import { Page } from 'coject';

// Theme
import useStyles from './Theme';
import PrcAvailableJobDataSelAny from '../Pages/Employment/PrcAvailableJobDataSelAny';

const Home = () => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Page title={''}>
                <Box className={classes.root}>
                    <PrcAvailableJobDataSelAny />
                </Box>
            </Page>
        </React.Fragment>
    )
}

export default Home;