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
  keywords: "δημοσκόπηση, Ελλάδα, πολιτική, εκλογές, live poll, πρωθυπουργός, κόμματα, eklogiko-kentro.gr",
  authors: [{ name: "eklogiko-kentro.gr Team" }],
  creator: "eklogiko-kentro.gr",
  publisher: "eklogiko-kentro.gr",
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
    siteName: "eklogiko-kentro.gr",
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

// Προσθήκη structured data για navigation
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "eklogiko-kentro.gr - Live Δημοσκοπήσεις",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "mainEntity": [
    {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/`,
      "name": "Καταλληλότερος Πρωθυπουργός - Δημοσκόπηση",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/`
    },
    {
      "@type": "WebPage", 
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/dimoskopisi-komma`,
      "name": "Δημοσκόπηση Κομμάτων - Βουλευτικές Εκλογές",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/dimoskopisi-komma`
    }
  ]
};
