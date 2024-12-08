import React, { useEffect, useState } from "react";

// Cache Provider
import { CacheProvider } from "@emotion/react";

// Cache
import createCache from "@emotion/cache";

// Stylis
import { prefixer } from "stylis";

// RTL Plugin Theme
import rtlPlugin from "stylis-plugin-rtl";

// Theme Provider
import { ThemeProvider } from "@mui/material/styles";

// Material UI Base Line
import CssBaseline from "@mui/material/CssBaseline";

// Route Provider
import RouteProvider from "./Services/Routes";

// Translation
import { useTranslation } from "react-i18next";

// Coject
import { Request } from "coject";

// Theme
const theme = import.meta.env.VITE_THEME || "Default";
import styleTheme from "./Master/Themes/Default/Styles";
import(`./Master/Themes/${theme}/index.css`);

const App = () => {
    const { t } = useTranslation();
    const[ language, setLanguage ] = useState(localStorage.language);

    // Settings
    useEffect(() => {
        Request({
            dataSource: {
                dataPath: "VIEW.LANGUAGE",
                apiUrl: "/security/application/setting"
            },
            callback: (data) => {
                localStorage.lang_one = data[0].ONE.Iso;
                localStorage.lang_two = data[0].TWO.Iso;
                !localStorage.language && (localStorage.language = data[0].ONE.Iso || "ar");
                !localStorage.languageDir && (localStorage.languageDir = data[0].ONE.Dir || "rtl");
            }
        }).then();
    }, []);

    // Set Direction
    useEffect(() => {
        document.documentElement.lang = localStorage.language || "ar";
        document.documentElement.dir = localStorage.languageDir || "rtl";
    }, []);

    // Set Language
    useEffect(() => {
        setLanguage(localStorage.language)
    }, [t]);

    // Firing Style
    const cacheLang = createCache({
        key: "language",
        stylisPlugins: language === "ar" ? [prefixer, rtlPlugin] : [prefixer]
    });

    return (
        <React.Fragment>
            <CacheProvider value={cacheLang}>
                <ThemeProvider theme={styleTheme(language)}>
                    <RouteProvider>
                        <CssBaseline />
                    </RouteProvider>
                </ThemeProvider>
            </CacheProvider>
        </React.Fragment>
    );
}

export default App;