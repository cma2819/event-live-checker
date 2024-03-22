'use client';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontFamily: [
            "var(--font--kosugi-maru)",
            "Roboto",
            "-apple-system",
            "sans-serif"
        ].join(','),
    },
    palette: {
        primary: { main: '#fa95af' },
        youtube: { main: '#ff0000'},
        twitch: { main: '#9146FF' },
        live: red,
    },
    components: {
        MuiIcon: {
            styleOverrides: {
                root: {
                    // Match 24px = 3 * 2 + 1.125 * 16
                    boxSizing: 'content-box',
                    padding: 3,
                    fontSize: '1.125rem',
                },
            },
        },
    },
});

export default theme;
declare module '@mui/material/styles' {
    interface Palette {
        youtube: Palette['primary'];
        twitch: Palette['primary'];
        live: Palette['primary'];
    }

    interface PaletteOptions {
        youtube?: PaletteOptions['primary'];
        twitch?: PaletteOptions['primary'];
        live?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        youtube: true;
        twitch: true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        live: true;
    }
}