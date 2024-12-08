import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: "100%",
            display: "flex",
            minHeight: "100vh",
            position: "relative",
            alignItems: "center",
            justifyContent: "center"
        },
        container: {
            width: "600px",
            padding: "25px",
            maxWidth: "100%",
            textAlign: "center",
            "& h1": {
                fontSize: "88px",
                fontWeight: "500",
                marginBottom: "10px",
                color: theme.palette.secondary.main
            },
            "& h4": {
                fontSize: "20px",
                fontWeight: "500",
                textTransform: "uppercase",
                color: theme.palette.secondary.main
            },
            "& svg": {
                fontSize: "68px",
                color: theme.palette.primary.main,
                animation: "spin 2s linear infinite",
                "@keyframes spin": {
                    "0%": {
                      transform: "rotate(360deg)"
                    },
                    "100%": {
                      transform: "rotate(0deg)"
                    }
                }
            },
            "& .MuiBox-root": {
                display: "block",
                marginTop: "45px",
                "& button": {
                    padding: "10px",
                    fontSize: "13px",
                    fontWeight: "400"
                }
            },
            "& button": {
                padding: "10px 45px !important"
            },
            "& img": {
                width: "100%"
            }
        },
        language: {
            right: "25px",
            bottom: "25px",
            position: "absolute",
            "& button": {
                gap: 6,
                width: "99px",
                display: "flex",
                padding: "7px 0",
                minWidth: "auto",
                fontSize: "13px",
                lineHeight: "13px",
                alignItems: "center",
                borderRadius: "unset",
                textTransform: "capitalize",
                border: "1px solid" + theme.palette.grey[400],
                "& img": {
                    width: "26px",
                    height: "14px"
                }
            }
        },
        languageList: {
            "& .MuiMenu-paper": {
                boxShadow: "unset",
                borderRadius: "unset"
            },
            "& ul": {
                gap: 10,
                margin: 0,
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                borderBottom: "unset !important",
                border: "1px solid" + theme.palette.grey[400],
                "& li": {
                    gap: 6,
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    minWidth: "auto",
                    fontSize: "13px",
                    lineHeight: "13px",
                    alignItems: "center",
                    textTransform: "capitalize",
                    "& img": {
                        width: "26px",
                        height: "14px"
                    }
                }
            }
        }
    }
});

export default useStyles;