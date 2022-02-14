import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: grey[500]
        },
        secondary: {
            main: grey[500]
        }
    },
    typography: {
        fontFamily: 'Lucida Console',
        h1: {
            fontWeight: 700,
            fontSize: '3rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 'bold',
            fontSize: '1.8rem',
        }
    },
})

export default theme;