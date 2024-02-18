'use client';

import {
    BrandVariants,
    FluentProvider,
    Theme,
    createDarkTheme,
    createLightTheme,
    makeStaticStyles,
    shorthands,
    tokens,
    webDarkTheme
} from "@fluentui/react-components";

import '@microsoft-graveyard/styles/globals.css';

const myBrand: BrandVariants = {
    10: "#030303",
    20: "#171717",
    30: "#252525",
    40: "#313131",
    50: "#3D3D3D",
    60: "#494949",
    70: "#565656",
    80: "#636363",
    90: "#717171",
    100: "#7F7F7F",
    110: "#8D8D8D",
    120: "#9B9B9B",
    130: "#AAAAAA",
    140: "#B9B9B9",
    150: "#C8C8C8",
    160: "#D7D7D7"
};

const platinumTheme: BrandVariants = {
    10: "#030303",
    20: "#161819",
    30: "#242829",
    40: "#2E3436",
    50: "#394043",
    60: "#444D50",
    70: "#4F5B5E",
    80: "#5B686C",
    90: "#67767B",
    100: "#758489",
    110: "#859296",
    120: "#94A0A4",
    130: "#A4AEB1",
    140: "#B5BDBF",
    150: "#C5CCCE",
    160: "#D6DBDC"
};

const lightTheme: Theme = {
    ...createLightTheme(platinumTheme),
};

const darkTheme: Theme = {
    ...createDarkTheme(platinumTheme),
};

const useStaticStyles = makeStaticStyles({
    html: {
        backgroundColor: tokens.colorNeutralBackground1,
    },
    body: {
        backgroundColor: tokens.colorNeutralBackground1,
    }
})


darkTheme.colorBrandForeground1 = platinumTheme[110];
darkTheme.colorBrandForeground2 = platinumTheme[120];

const ThemeProvider = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    useStaticStyles();

    return (
        <FluentProvider theme={darkTheme}>
            {children}
        </FluentProvider>
    );
};

export default ThemeProvider;
