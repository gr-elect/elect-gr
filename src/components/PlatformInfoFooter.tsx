'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Brain, Smartphone, Info } from 'lucide-react';

export function PlatformInfoFooter() {
  return (
    <>
      {/* Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Πώς λειτουργεί η πλατφόρμα
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Διαφάνεια και αξιοπιστία στη δημοσκόπηση
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Σύγχρονα Δεδομένα
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Διατηρούμε καταχωρίσεις από τις τελευταίες 30 ημέρες προκειμένου τα αποτελέσματα 
                    να αντικατοπτρίζουν την πιο πρόσφατη πολιτική σφυγμομέτρηση της κοινής γνώμης.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Στατιστική Ανάλυση
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Με τη χρήση αλγορίθμων τεχνητής νοημοσύνης, πραγματοποιείται στάθμιση των 
                    αποτελεσμάτων βάσει δημογραφικών στοιχείων της τελευταίας απογραφής.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Smartphone className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Μία Ψήφος ανά Συσκευή
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Κάθε συσκευή δικαιούται μίας ψήφου για τη διασφάλιση της εγκυρότητας της 
                    διαδικασίας. Παρέχεται δυνατότητα τροποποίησης της επιλογής σας.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Info className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Ενημερωτικός Χαρακτήρας
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Η παρούσα πλατφόρμα δεν αποτελεί επίσημη υπηρεσία του Δημοσίου. Ο σκοπός 
                    της είναι αποκλειστικά ενημερωτικός και η συμμετοχή είναι εθελοντική.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Μη επίσημη διαδικτυακή ψηφοφορία. Τα αποτελέσματα είναι ενδεικτικά.</p><p className="text-sm text-gray-500 dark:text-gray-400">Επικοινωνία contact@eklogiko-kentro.gr</p>
           </motion.div>
    </>
  );
}
