import React from "react";

// Axios
import Axios from "axios";

// React Router
import { useNavigate } from "react-router-dom";

// React Toastify
import { toast } from "react-toastify";

// Coject
import { RequestCreation } from "coject";

const Middleware = ({ children }) => {
    let refreshValue;
    const language = "ar";
    const Navigate = useNavigate();

    // Request Handler
    RequestCreation.interceptors.request.use(
        (RequestCreation) => {
            if (RequestCreation.url !== "/sign-in" || RequestCreation.url !== "/sign-up" || RequestCreation.url !== "/forgot-password" || RequestCreation.url !== "/reset-password") {
                const AccessToken = localStorage.getItem("token");
                const RefreshToken = localStorage.getItem("refresh");
                RequestCreation.headers["Page-Code"] = localStorage.getItem("page_code");
                RequestCreation.headers["Refresh-Token"] = RefreshToken ? RefreshToken : "";
                RequestCreation.headers.Authorization = AccessToken ? `Bearer ${AccessToken}` : "";
            }
            RequestCreation.headers.Language = localStorage.language === language ? localStorage.lang_one : localStorage.lang_two;
            return RequestCreation;
        },
        (Error) => Promise.reject(Error)
    );

    // Refresh Request
    const refreshRequest = async () => {
        const request = await Axios.post(import.meta.env.VITE_URL + "/security/Refresh", {}, {
            headers: { "Refresh-Token": localStorage.refresh }
        });
        return [request.data.ACCESS_TOKEN, request.data.REFRESH_TOKEN];
    }

    // Check Unauthorized
    const unauthorized = (error) => {
        const { response: { status } } = error;
        return status === 401;
    }

    // Error Handler
    RequestCreation.interceptors.response.use((Response) => { return Response }, async (Error) => {
        if (Error.response) {
            // Unauthorized
            if (Error.response.status === 401) {
                if (!Error.config._retry && localStorage.token && localStorage.refresh) {
                    try {
                        if (!refreshValue) refreshValue = refreshRequest();
                        const [newToken, newRefresh] = await refreshValue;
                        localStorage.token = newToken;
                        localStorage.refresh = newRefresh;
                        RequestCreation.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                        RequestCreation.defaults.headers.common["Refresh-Token"] = `${newRefresh}`;
                        try {
                            return await RequestCreation(Error.config);
                        } catch (innerError) {
                            if (unauthorized(innerError)) {
                                throw innerError;
                            }
                        }
                    }
                    catch {
                        localStorage.removeItem("refresh");
                        localStorage.removeItem("token");
                        Navigate("/sign-in");
                        toast.error("You Are Unauthorized", {
                            toastId: "uniqueId"
                        });
                    }
                    finally {
                        refreshValue = undefined;
                    }
                } else {
                    localStorage.removeItem("refresh");
                    localStorage.removeItem("token");
                    Navigate("/sign-in");
                    toast.error("You Are Unauthorized", {
                        toastId: "uniqueId"
                    });
                }
            }

            // Api Not Found
            if (Error.response.status === 404) {
                toast.error("Api Not Found", {
                    toastId: "uniqueId"
                });
            }

            // Database Error
            if (Error.response.status === 500) {
                toast.error(Error.response.data?.MESSAGE?.MESSAGE, {
                    toastId: "uniqueId"
                });
            }
        }
        return Promise.reject(Error);
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default Middleware;