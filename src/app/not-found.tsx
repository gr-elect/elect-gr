import type { Metadata } from "next";
import Link from 'next/link';
import { PlatformInfoFooter } from '@/components/PlatformInfoFooter';

export const metadata: Metadata = {
  title: "Σελίδα δε βρέθηκε - 404",
  description: "Η σελίδα που αναζητάτε δεν υπάρχει. Επιστρέψτε στις δημοσκοπήσεις μας.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 mr-2"
                style={{ color: '#1a5cc6' }}
              >
                <path d="m9 12 2 2 4-4" />
                <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
                <path d="M22 19H2" />
              </svg>
              <span className="text-3xl font-bold" style={{ color: '#1a5cc6' }}>Δημοσκόπηση</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Eklogiko-kentro.gr
            </h1>
          </div>
        </div>

        {/* 404 Content */}
        <div className="text-center py-16">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Η σελίδα δε βρέθηκε
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Λυπούμαστε, αλλά η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Δημοσκόπηση Πρωθυπουργός
            </Link>
            <Link 
              href="/dimoskopisi-komma"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Δημοσκόπηση Κομμάτων
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Βοήθεια
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Αν πιστεύετε ότι αυτό είναι λάθος, παρακαλούμε επικοινωνήστε μαζί μας στο:
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              contact@eklogiko-kentro.gr
            </p>
          </div>
        </div>

        {/* Platform Info Footer */}
        <PlatformInfoFooter />
      </div>
    </div>
  );
}