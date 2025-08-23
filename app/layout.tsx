import type { Metadata } from "next";
import { Noto_Serif, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import BreakpointIndicator from "@/components/BreakpointIndicator";
import { TRPCReactProvider } from "@/trpc/client";

const lexend = Poppins({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-lead",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Meet AI",
  description: "All you need to be more organized as student.",
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${lexend.variable} ${notoSerif.variable} antialiased font-text`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* <BreakpointIndicator /> */}
          </ThemeProvider>
          <Toaster
            position="top-right"
            richColors
            style={{
              fontFamily: "var(--font-text)",
            }}
          />
        </body>
      </html>
    </TRPCReactProvider>
  );
}
