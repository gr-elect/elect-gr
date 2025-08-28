'use client';

import { Card, CardContent } from '@/components/ui/card';
import { VoteChoice } from '@/lib/schema';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface VoteOptionCardProps {
  choice: VoteChoice;
  isSelected: boolean;
  onSelect: (choice: VoteChoice) => void;
  isLoading?: boolean;
}

const partyInfo: Record<VoteChoice, { party: string; color: string }> = {
  'Μητσοτάκης': { party: 'ΝΔ', color: 'bg-[#1a5cc6]' },
  'Ανδρουλάκης': { party: 'ΠΑΣΟΚ', color: 'bg-[#027b3c]' },
  'Κωνσταντοπούλου': { party: 'ΠΛΕΥΣΗ ΕΛΕΥΘΕΡΙΑΣ', color: 'bg-[#af3b8b]' },
  'Λατινοπούλου': { party: 'ΦΩΝΗ ΛΟΓΙΚΗΣ', color: 'bg-[#1863dc]' },
  'Κουτσούμπας': { party: 'ΚΚΕ', color: 'bg-[#e70a11]' },
  'Βελόπουλος': { party: 'ΕΛΛΗΝΙΚΗ ΛΥΣΗ', color: 'bg-[#4db2ec]' },
  'Κασσελάκης': { party: 'ΚΙΝΗΜΑ ΔΗΜΟΚΡΑΤΙΑΣ', color: 'bg-[#5b15a7]' },
  'Φάμελλος': { party: 'ΣΥΡΙΖΑ', color: 'bg-[#774fa0]' },
  'Τσίπρας': { party: 'ΣΥΡΙΖΑ', color: 'bg-[#fa8072]' },
  'Χαρίτσης': { party: 'ΝΕΑ ΑΡΙΣΤΕΡΑ', color: 'bg-[#e11b22]' },
  'Νατσιός': { party: 'ΝΙΚΗ', color: 'bg-[#092544]' },
  'Άλλος': { party: 'ΑΛΛΟ ΚΟΜΜΑ', color: 'bg-gray-500' },
  'Κανένας': { party: 'ΑΠΟΧΗ', color: 'bg-gray-400' }
};

export function VoteOptionCard({ 
  choice, 
  isSelected, 
  onSelect, 
  isLoading = false 
}: VoteOptionCardProps) {
  const { party, color } = partyInfo[choice];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'ring-2 ring-primary shadow-lg' 
            : 'hover:shadow-md'
        }`}
        onClick={() => !isLoading && onSelect(choice)}
      >
        <CardContent className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {choice}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {party}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${color}`} />
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-primary"
                >
                  <Check size={20} />
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
