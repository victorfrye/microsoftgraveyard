'use client';

import {
    BrandVariants,
    FluentProvider,
    Theme,
    createDarkTheme,
    createLightTheme
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

const lightTheme: Theme = {
    ...createLightTheme(myBrand),
};

const darkTheme: Theme = {
    ...createDarkTheme(myBrand),
};


darkTheme.colorBrandForeground1 = myBrand[110];
darkTheme.colorBrandForeground2 = myBrand[120];

export default function ThemeProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <FluentProvider theme={darkTheme}>
            {children}
        </FluentProvider>
    );
};
