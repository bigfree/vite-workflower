import { extendTheme, PaletteRange, Theme } from "@mui/joy";

declare module '@mui/joy/styles' {
    interface Palette {
        blue: Partial<PaletteRange> | undefined;
        purple: Partial<PaletteRange> | undefined;
    }
}

declare module '@mui/joy/IconButton' {
    interface IconButtonPropsVariantOverrides  {
        aside: true;
    }
}

// https://coolors.co/1d8fed-f15555-f5d866-9d89e6
export const appTheme: Theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                purple: {
                    50: '#D8D0F5',
                    100: '#C4B8F0',
                    200: '#BAACEE',
                    300: '#B1A1EB',
                    400: '#A795E9',
                    500: '#9D89E6',
                    600: '#8574C4',
                    700: '#8574C4',
                    800: '#4F4573',
                    900: '#100E17',
                    softColor: '#9D89E6',
                },
                blue: {
                    50: '#E8F4FD',
                    100: '#8EC7F6',
                    200: '#83C1F5',
                    300: '#56ABF2',
                    400: '#2895EE',
                    500: '#1D8FED',
                    600: '#166BB2',
                    700: '#104F82',
                    800: '#092B47',
                    900: '#030E18',
                    plainHoverBg: 'rgba(232, 244, 253, .5)',
                    solidHoverBg: 'rgba(232, 244, 253, .5)',
                    softHoverBg: 'rgba(232, 244, 253, .5)',
                },
                divider: '#efefef',
            },
        }
    },
    components:{
        JoyIconButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.variant === 'aside' && {
                        borderRadius: 0,
                        padding: 0,
                        height: 80,
                        borderBottom: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: theme.palette.neutral["100"],
                        cursor: 'pointer',
                        flexFlow: 'column',
                        // '& > *:not(svg)': {
                        //     fontSize: 4,
                        // }
                    }),
                }),
            },
        },
        // JoyFormLabel: {
        //     styleOverrides: {
        //         root: {
        //             mb
        //         }
        //     }
        // }
    },
});