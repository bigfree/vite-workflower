import {createTheme, Theme} from "@mui/material";
import {blue, pink} from "@mui/material/colors";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: pink[500]
        },
    }
});