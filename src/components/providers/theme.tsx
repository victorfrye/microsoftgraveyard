'use client';

import {
    BrandVariants,
    FluentProvider,
    Theme,
    createDarkTheme,
    createLightTheme,
    makeStaticStyles,
    tokens,
} from "@fluentui/react-components";

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

darkTheme.colorBrandForeground1 = platinumTheme[110];
darkTheme.colorBrandForeground2 = platinumTheme[120];

const useStaticStyles = makeStaticStyles({
    p: {
        marginBlockStart: tokens.spacingVerticalXS,
        marginBlockEnd: tokens.spacingVerticalXS,
        marginInlineStart: 0,
        marginInlineEnd: 0,
    },
    ul: {
        listStyleType: 'none',
        marginBlockStart: tokens.spacingVerticalXS,
        marginBlockEnd: tokens.spacingVerticalXS,
        marginInlineStart: 0,
        marginInlineEnd: 0,
        paddingInlineStart: 0,
    }
});

const ThemeProvider = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    useStaticStyles();

    return (
        <FluentProvider theme={darkTheme}>
            {children}
        </FluentProvider>
    );
};

export default ThemeProvider;
