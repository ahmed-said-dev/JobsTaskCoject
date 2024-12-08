import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

// React Router
import { BrowserRouter } from "react-router-dom";

// React Toastify
import { ToastContainer } from "react-toastify";

// Store Provider
import StoreProvider from "./Services/Stores";

// Middleware
import Middleware from "./Services/Middleware";

// Application
import Application from "./App";

// Translation
import "./Services/Translation";

// Vendors Styles
import "react-toastify/dist/ReactToastify.css";

// Project
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <Suspense>
            <StoreProvider>
                <BrowserRouter basename="/">
                    <Middleware>
                        <Application />
                        <ToastContainer />
                    </Middleware>
                </BrowserRouter>
            </StoreProvider>
        </Suspense>
    </React.Fragment>
)