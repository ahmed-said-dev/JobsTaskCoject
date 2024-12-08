import React, { lazy, useEffect } from 'react';

// React Router
import { Outlet, useLocation } from "react-router-dom";

// Themeconst
const theme = import.meta.env.VITE_THEME || "Default";
const StyleTheme = lazy(() => import(`./Themes/${theme}/index.jsx`).then((module) => ({ default: module.Theme })));

const Master = () => {
    const Location = useLocation();

    // Set Page Code
    useEffect(() => {
        const locationPath = Location?.pathname?.split("/") || [];
        if (!!locationPath?.length) {
            localStorage.page_code = locationPath[locationPath.length - 1];
        }
    }, [Location]);

    return (
        <React.Fragment>
            <StyleTheme>
                <Outlet />
            </StyleTheme>
        </React.Fragment>
    )
}

export default Master;