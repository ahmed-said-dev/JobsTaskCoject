import React, { useState, useEffect } from "react";

// Translation
import i18next from "i18next";
import { useTranslation } from "react-i18next";

// React Router
import { useNavigate } from "react-router-dom";

// Material UI
import { Box, Menu, MenuItem, Typography } from "@mui/material";

// Coject
import { Button, Icons } from "coject";

// Images
import Error from '../../assets/Images/error404.png';

// Theme
import useStyles from "./Theme";

const Error404 = () => {
    const Navigate = useNavigate();
    const { classes } = useStyles();
    const { t } = useTranslation(["Global"]);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ language, setLanguage ] = useState(localStorage.language || "ar");

    // Languages Select
    const languageSelect = (key) => {
        setLanguage(key);
        setAnchorEl(null);
        i18next.changeLanguage(key);
        localStorage.language = key;
        localStorage.languageDir = key === "en" ? "ltr" : "rtl";
    }

    // Change Language
    useEffect(() => {
        const mainElement = document.querySelector("html");
        const setAttributes = (element, attributes) => {
            for(const key in attributes) { element.setAttribute(key, attributes[key]) }
        };
        setAttributes(mainElement, { dir: language === "en" ? "ltr" : "rtl", lang: language });
    }, [language]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Box className={classes.container}>
                    <Typography variant="h1">4<Icons.Support />4</Typography>
                    <Typography variant="h4">{t("Global:error404")}</Typography>
                    <Button className={classes.button} variant="contained" onClick={() => Navigate("/")}>{t("Global:dashboard")}</Button>
                    <img alt="Error404" src={Error} />
                </Box>
                <Box className={classes.language}>
                    <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
                        <img alt="Onboarding" src={`${import.meta.env.VITE_PATH}images/lang/${language}.jpg`} /> {language === "ar" ? "العربية" : "English"}
                    </Button>
                    <Menu className={classes.languageList} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} transformOrigin={{ horizontal: "right", vertical: "bottom" }} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
                        <MenuItem onClick={() => languageSelect("ar")}><img alt="Onboarding" src={import.meta.env.VITE_PATH + "images/lang/ar.jpg"} /> العربية</MenuItem>
                        <MenuItem onClick={() => languageSelect("en")}><img alt="Onboarding" src={import.meta.env.VITE_PATH + "images/lang/en.jpg"} /> English</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Error404;