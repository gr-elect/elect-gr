import type { Metadata } from "next";
import PartyPageClient from '@/components/PartyPageClient';

export const metadata: Metadata = {
  title: "Δημοσκόπηση Κομμάτων - Ποσοστά Live Διαδικτυακή Δημοσκόπηση Τώρα",
  description: "Δείτε τα τελευταία ποσοστά των κομμάτων σε νέα live διαδικτυακή δημοσκόπηση σήμερα. Όλα τα αποτελέσματα της τελευταίας δημοσκόπησης κομμάτων στην Ελλάδα.",
  keywords: "δημοσκόπηση, βουλευτικές εκλογές, κόμματα, Ελλάδα, πολιτική, ΝΔ, ΠΑΣΟΚ, ΣΥΡΙΖΑ, ΚΚΕ, live poll, εκλογική πρόθεση",
  openGraph: {
    title: "Δημοσκόπηση Βουλευτικών Εκλογών - Live Ψηφοφορία",
    description: "Ψηφίστε για το κόμμα της επιλογής σας στις επόμενες βουλευτικές εκλογές. Live αποτελέσματα και εκλογική πρόθεση.",
    type: "website",
    locale: "el_GR",
  },
  twitter: {
    card: "summary_large_image", 
    title: "Δημοσκόπηση Βουλευτικών Εκλογών",
    description: "Συμμετάσχετε στη live δημοσκόπηση για τις βουλευτικές εκλογές και δείτε την εκλογική πρόθεση σε πραγματικό χρόνο.",
  },
};

export default function PartyPollPage() {
  return <PartyPageClient />;
}
