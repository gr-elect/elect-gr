'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoteOptionCard } from '@/components/VoteOptionCard';
import { ResultsChart } from '@/components/ResultsChart';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VoteChoice, VOTE_CHOICES, ResultsResponse } from '@/lib/schema';
import { CheckCircle, BarChart3, Users, Clock, Brain, Smartphone, Info } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Home() {
  const [currentVote, setCurrentVote] = useState<VoteChoice | null>(null);
  const [results, setResults] = useState<ResultsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load current vote on mount
  useEffect(() => {
    fetchCurrentVote();
    fetchResults(); // Πρόσθεσε αυτή τη γραμμή
  }, []);

  const fetchCurrentVote = async () => {
    try {
      const response = await fetch('/api/vote');
      const data = await response.json();
      if (data.choice) {
        setCurrentVote(data.choice);
      }
    } catch (error) {
      console.error('Error fetching current vote:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Σφάλμα κατά τη φόρτωση των αποτελεσμάτων');
    }
  };

  const handleVote = async (choice: VoteChoice) => {
    setIsLoading(true);
    setError(null);

    // Scroll στην κορυφή της σελίδας
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice }),
      });

      if (!response.ok) {
        throw new Error('Σφάλμα κατά την ψηφοφορία');
      }

      setCurrentVote(choice);
      await fetchResults();
      setShowResults(true);
    } catch (error) {
      console.error('Vote error:', error);
      setError('Σφάλμα κατά την ψηφοφορία. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeVote = () => {
    setShowResults(false);
  };

  const handleViewResults = async () => {
    setIsLoading(true);
    
    // Scroll στην κορυφή της σελίδας
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    await fetchResults();
    setShowResults(true);
    setIsLoading(false);
  };

  // Mapping χρωμάτων για κάθε υποψήφιο
  const getColorForChoice = (choice: string): string => {
    const colorMapping: Record<string, string> = {
      'Μητσοτάκης': '#1a5cc6',
      'Ανδρουλάκης': '#027b3c',
      'Κωνσταντοπούλου': '#af3b8b',
      'Λατινοπούλου': '#1863dc',
      'Κουτσούμπας': '#e70a11',
      'Βελόπουλος': '#4db2ec',
      'Κασσελάκης': '#5b15a7',
      'Φάμελλος': '#774fa0',
      'Χαρίτσης': '#e11b22',
      'Νατσιός': '#092544',
      'Άλλος': '#6b7280',
      'Κανένας': '#9ca3af'
    };
    return colorMapping[choice] || '#6b7280';
  };

  // Mapping κομμάτων για κάθε υποψήφιο
  const getPartyForChoice = (choice: string): string => {
    const partyMapping: Record<string, string> = {
      'Μητσοτάκης': 'ΝΔ',
      'Ανδρουλάκης': 'ΠΑΣΟΚ',
      'Κωνσταντοπούλου': 'ΠΛΕΥΣΗ ΕΛΕΥΘΕΡΙΑΣ',
      'Λατινοπούλου': 'ΦΩΝΗ ΛΟΓΙΚΗΣ',
      'Κουτσούμπας': 'ΚΚΕ',
      'Βελόπουλος': 'ΕΛΛΗΝΙΚΗ ΛΥΣΗ',
      'Κασσελάκης': 'ΚΙΝΗΜΑ ΔΗΜΟΚΡΑΤΙΑΣ',
      'Φάμελλος': 'ΣΥΡΙΖΑ',
      'Χαρίτσης': 'ΝΕΑ ΑΡΙΣΤΕΡΑ',
      'Νατσιός': 'ΝΙΚΗ',
      'Άλλος': 'ΑΛΛΟ ΚΟΜΜΑ',
      'Κανένας': 'ΑΠΟΧΗ'
    };
    return partyMapping[choice] || 'ΑΓΝΩΣΤΟ';
  };

  const getDisplayName = (choice: string): string => {
    const map: Record<string, string> = {
      'Μητσοτάκης': 'Μητσοτάκης Κ.',
      'Ανδρουλάκης': 'Ανδρουλάκης Ν.',
      'Κωνσταντοπούλου': 'Κωνσταντοπούλου Ζ.',
      'Βελόπουλος': 'Βελόπουλος Κ.',
      'Κουτσούμπας': 'Κουτσούμπας Δ.',
      'Κασσελάκης': 'Κασσελάκης Σ.',
      'Λατινοπούλου': 'Λατινοπούλου Α.',
      'Φάμελλος': 'Φάμελλος Σ.',
      'Χαρίτσης': 'Χαρίτσης Α.',
      'Νατσιός': 'Νατσιός Ν.',
      'Άλλος': 'Άλλος',
      'Κανένας': 'Κανένας'
    };
    return map[choice] ?? choice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Δημοσκόπηση Βουλευτικών Εκλογών
            </h1>
          </div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-2">
            Βουλευτικές Εκλογές 2027
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ποιον θεωρείτε καταλληλότερο για Πρωθυπουργό της χώρας;
          </p>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader />
        </div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="vote"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vote Info Card */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-center sm:text-left">Κάνε κλικ για να ψηφίσεις</CardTitle>
                      <div className="flex items-center justify-center sm:justify-start mt-2">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Σύνολο ψήφων:{' '}
                          {isLoading || !results ? (
                            <span className="inline-block align-middle h-5 w-16 sm:w-20 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                          ) : (
                            <span className="tabular-nums">
                              <AnimatedCounter value={results?.total || 0} />
                            </span>
                          )}{' '}
                          (τελευταίες 30 ημέρες)
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleViewResults}
                      variant="outline"
                      size="sm"
                      className="self-center sm:self-auto"
                      disabled={isLoading}
                    >
                      Προβολή Αποτελεσμάτων
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Vote Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                                 {VOTE_CHOICES.map((choice) => (
                  <VoteOptionCard
                    key={choice}
                    choice={choice}
                    isSelected={currentVote === choice}
                    onSelect={handleVote}
                    isLoading={isLoading}
                  />
                ))}
              </div>

              {/* View Results Button */}
              {results && (
                <div className="text-center">
                  <Button
                    onClick={handleViewResults}
                    variant="outline"
                    className="flex items-center mx-auto"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Προβολή Αποτελεσμάτων
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Results Header */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-center sm:text-left">Αποτελέσματα Δημοσκόπησης</CardTitle>
                      <div className="flex items-center justify-center sm:justify-start mt-2">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Σύνολο ψήφων:{' '}
                          {isLoading || !results ? (
                            <span className="inline-block align-middle h-5 w-16 sm:w-20 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                          ) : (
                            <span className="tabular-nums">
                              <AnimatedCounter value={results?.total || 0} />
                            </span>
                          )}{' '}
                          (τελευταίες 30 ημέρες)
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleChangeVote}
                      variant="outline"
                      size="sm"
                      className="self-center sm:self-auto"
                      disabled={isLoading}
                    >
                      Αλλαγή ψήφου
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Chart */}
              {results && <ResultsChart results={results} />}

              {/* Results Details */}
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
                  {results?.data
                    ?.sort((a, b) => b.count - a.count) // Ταξινόμηση από τις περισσότερες προς τις λιγότερες ψήφους
                    ?.map((item, index) => (
                      <Card key={item.choice} className="relative">
                        {/* Badge αρίθμησης πάνω-αριστερά */}
                        <span className="absolute top-2 left-2 text-xxs md:text-xs font-bold text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                          #{index + 1}
                        </span>

                        <CardContent className="px-4 py-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                                {getDisplayName(item.choice)}
                              </h3>

                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-2">
                                <span
                                  className="inline-block w-3 h-3 squared-sm mr-2"
                                  style={{ backgroundColor: getColorForChoice(item.choice) }}
                                />
                                {getPartyForChoice(item.choice)}
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-bold">{item.pct}%</span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}

              {/* Change Vote Button */}
              <div className="text-center mt-8">
                <Button onClick={handleChangeVote} variant="outline">
                  Αλλαγή ψήφου
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            Μη επίσημη διαδικτυακή ψηφοφορία. Τα αποτελέσματα είναι ενδεικτικά.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
