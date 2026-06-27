import type { Metadata } from "next";
import { Space_Grotesk, Puritan, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout-elements";
import { PageTransition } from "@/components/layout-elements";
import { Footer } from "@/components/layout-elements";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const puritan = Puritan({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-ui" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://stocksforge.vercel.app'),
  title: {
    default: "StocksForge - Institutional Research Terminal",
    template: "%s | StocksForge",
  },
  description: "StocksForge is an institutional-grade equity analytics and financial research terminal. Access real-time market data, AI-driven insights, and advanced stock screening.",
  keywords: [
    "StocksForge", "StockForge", "stock screener", "investment research", 
    "financial terminal", "equity analytics", "market intelligence", 
    "real-time stock data", "institutional trading platform", 
    "stock analysis software", "portfolio tracker", "AI stock insights"
  ],
  authors: [{ name: "StocksForge Team" }],
  creator: "StocksForge",
  publisher: "StocksForge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "StocksForge - Institutional Research Terminal",
    description: "Smarter research. Better investments. Experience the next generation of equity analytics.",
    url: "https://stocksforge.vercel.app",
    siteName: "StocksForge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StocksForge - Institutional Research Terminal",
    description: "Smarter research. Better investments. Experience the next generation of equity analytics.",
    creator: "@StocksForge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    title: "StocksForge",
    statusBarStyle: "default",
    capable: true,
  },
};

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ui } from '@clerk/ui'
import { ThemeProvider } from "@/components/layout-elements";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      ui={ui}
      appearance={{

        variables: {
          colorPrimary: '#09090B',
        },
        elements: {
          card: 'bg-card border border-border shadow-sm rounded-2xl',
          formButtonPrimary: 'bg-primary hover:bg-primary-hover text-primary-foreground',
          socialButtonsBlockButton: 'border border-border bg-background hover:bg-muted text-foreground',
          socialButtonsBlockButtonText: 'font-semibold',
          formFieldInput: 'bg-muted border-none focus-visible:ring-1 focus-visible:ring-primary rounded-lg',
          footerActionLink: 'text-primary hover:text-primary/90',
        }
      }}
      localization={{
        signIn: {
          start: {
            title: 'StocksForge',
            subtitle: 'Welcome back! Please enter your details.',
          }
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${spaceGrotesk.variable} ${puritan.variable} ${jetbrainsMono.variable} ${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="flex-1 flex flex-col">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
