'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyVoteOptionCard } from '@/components/PartyVoteOptionCard';
import { PartyResultsChart } from '@/components/PartyResultsChart';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PartyChoice, PARTY_CHOICES, Demographics } from '@/lib/schema';
import { BarChart3, Users } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import { DemographicsDialog } from '@/components/DemographicsDialog';
import { TabNavigation } from '@/components/TabNavigation';
import { loadDemographics, saveDemographics, loadPartyVote, savePartyVote } from '@/lib/cookies';

interface PartyResultsResponse {
  total: number;
  data: Array<{
    choice: PartyChoice;
    count: number;
    pct: number;
  }>;
}

export default function PartyPollPage() {
  const [currentVote, setCurrentVote] = useState<PartyChoice | null>(null);
  const [results, setResults] = useState<PartyResultsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemographicsDialog, setShowDemographicsDialog] = useState(false);
  const [pendingVoteChoice, setPendingVoteChoice] = useState<PartyChoice | null>(null);

  // Load current vote on mount
  useEffect(() => {
    // Load from cookies first
    const savedVote = loadPartyVote();
    if (savedVote) {
      setCurrentVote(savedVote);
    }
    
    fetchCurrentVote();
    fetchResults();
  }, []);

  const fetchCurrentVote = async () => {
    try {
      const response = await fetch('/api/party-vote');
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
      const response = await fetch('/api/party-results');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Σφάλμα κατά τη φόρτωση των αποτελεσμάτων');
    }
  };

  const handleVote = (choice: PartyChoice) => {
    setPendingVoteChoice(choice);
    
    // Check if we have saved demographics
    const savedDemographics = loadDemographics();
    if (savedDemographics) {
      // If we have demographics, submit directly
      handleDemographicsSubmit(choice, savedDemographics);
    } else {
      // If no demographics, show the dialog
      setShowDemographicsDialog(true);
    }
  };

  const handleDemographicsSubmit = async (choice: PartyChoice, demographics: Demographics) => {
    setIsLoading(true);
    setError(null);
    setShowDemographicsDialog(false);

    // Scroll στην κορυφή της σελίδας
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/party-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice, demographics, pollType: 'party_preference' }),
      });

      if (!response.ok) {
        throw new Error('Σφάλμα κατά την ψηφοφορία');
      }

      setCurrentVote(choice);
      savePartyVote(choice); // Save to cookies
      saveDemographics(demographics); // Save demographics to cookies
      await fetchResults();
      setShowResults(true);
    } catch (error) {
      console.error('Vote error:', error);
      setError('Σφάλμα κατά την ψηφοφορία. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsLoading(false);
      setPendingVoteChoice(null);
    }
  };

  const handleDemographicsClose = () => {
    setShowDemographicsDialog(false);
    setPendingVoteChoice(null);
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

  // Mapping χρωμάτων για κάθε κόμμα
  const getColorForChoice = (choice: string): string => {
    const colorMapping: Record<string, string> = {
      'ΝΔ': '#1a5cc6',
      'ΠΑΣΟΚ': '#027b3c',
      'ΠΛΕΥΣΗ ΕΛΕΥΘΕΡΙΑΣ': '#af3b8b',
      'ΦΩΝΗ ΛΟΓΙΚΗΣ': '#1863dc',
      'ΚΚΕ': '#e70a11',
      'ΕΛΛΗΝΙΚΗ ΛΥΣΗ': '#4db2ec',
      'ΚΙΝΗΜΑ ΔΗΜΟΚΡΑΤΙΑΣ': '#5b15a7',
      'ΣΥΡΙΖΑ': '#774fa0',
      'ΝΕΑ ΑΡΙΣΤΕΡΑ': '#e11b22',
      'ΝΙΚΗ': '#092544',
      'ΑΛΛΟ ΚΟΜΜΑ': '#6b7280',
      'ΑΠΟΧΗ': '#9ca3af'
    };
    return colorMapping[choice] || '#6b7280';
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-blue-600 mr-3"
            >
              <path d="m9 12 2 2 4-4" />
              <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
              <path d="M22 19H2" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              <span style={{ color: '#1a5cc6' }}>Δημοσκόπηση</span> Βουλευτικών Εκλογών
            </h1>
          </div>
          <TabNavigation />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            <strong>Ποιο κόμμα σκοπεύετε να ψηφίσετε στις επόμενες εκλογές;</strong>
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
                      <CardTitle className="text-center sm:text-left">Κάντε κλικ για να ψηφίσετε</CardTitle>
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
                {PARTY_CHOICES.map((choice) => (
                  <PartyVoteOptionCard
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
              {results && <PartyResultsChart results={results} />}

              {/* Results Details */}
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
                  {results?.data
                    ?.sort((a, b) => b.count - a.count)
                    ?.map((item, index) => (
                      <Card key={item.choice} className="relative">
                        <span className="absolute top-2 left-2 text-xxs md:text-xs font-bold text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                          #{index + 1}
                        </span>

                        <CardContent className="px-4 py-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                                {item.choice}
                              </h3>

                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-2">
                                <span
                                  className="inline-block w-3 h-3 squared-sm mr-2"
                                  style={{ backgroundColor: getColorForChoice(item.choice) }}
                                />
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

        {/* Demographics Dialog */}
        {pendingVoteChoice && (
          <DemographicsDialog
            isOpen={showDemographicsDialog}
            onClose={handleDemographicsClose}
            onSubmit={handleDemographicsSubmit}
            selectedChoice={pendingVoteChoice}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
