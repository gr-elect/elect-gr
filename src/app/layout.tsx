import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s |- Live Δημοσκοπήσεις",
    default: "- Live Διαδικτυακές Δημοσκοπήσεις Ελλάδα"
  },
  description: "Η πλατφόρμα για live διαδικτυακές δημοσκοπήσεις στην Ελλάδα. Συμμετάσχετε σε δημοσκοπήσεις για τον καταλληλότερο πρωθυπουργό και τις βουλευτικές εκλογές με πραγματικό χρόνο αποτελέσματα.",
  keywords: "δημοσκόπηση, Ελλάδα, πολιτική, εκλογές, live poll, πρωθυπουργός, κόμματα, elect.gr",
  authors: [{ name: "Elect.gr Team" }],
  creator: "Elect.gr",
  publisher: "Elect.gr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "Elect.gr",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@electgr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
