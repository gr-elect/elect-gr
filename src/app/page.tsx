import type { Metadata } from "next";
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: "Καταλληλότερος Πρωθυπουργός - Live Διαδικτυακή Δημοσκόπηση Τώρα",
  description: "Δείτε την πρόθεση ψήφου για τον καταλληλότερο πρωθυπουργό στη νέα live διαδικτυακή δημοσκόπηση τώρα - τελευταία κρυφή δημοσκόπηση σήμερα στην Ελλάδα.",
  keywords: "δημοσκόπηση, πρωθυπουργός, Ελλάδα, πολιτική, εκλογές, ψηφοφορία, Μητσοτάκης, Ανδρουλάκης, live poll",
  openGraph: {
    title: "Καταλληλότερος Πρωθυπουργός - Live Δημοσκόπηση",
    description: "Ψηφίστε για τον καταλληλότερο πρωθυπουργό της Ελλάδας. Live αποτελέσματα και διαδικτυακή συμμετοχή.",
    type: "website",
    locale: "el_GR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Καταλληλότερος Πρωθυπουργός - Live Δημοσκόπηση",
    description: "Ψηφίστε για τον καταλληλότερο πρωθυπουργό της Ελλάδας στη live διαδικτυακή δημοσκόπηση.",
  },
};

export default function Home() {
  return <HomePageClient />;
}
