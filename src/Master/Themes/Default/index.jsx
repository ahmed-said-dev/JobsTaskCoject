import React from "react";

// Material UI
import { Box } from "@mui/material";

// Theme
import useStyles from "./Theme";

export const Theme = ({ children }) => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.root}>
                {children}
            </Box>
        </React.Fragment>
    )
}