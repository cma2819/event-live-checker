import type { Metadata } from "next";
import { Kosugi_Maru } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AppNavbar } from './components/app-navbar';
import config from './config';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

fontawesomeConfig.autoAddCss = false

const kosugiMaru = Kosugi_Maru({weight: ['400'], subsets: ['latin']});

export const metadata: Metadata = {
  title: "K-STAR 2024 stream checker",
  description: "Stream checker for K-STAR 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kosugiMaru.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AppNavbar appName={config.event.name} />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
