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
  'Χαρίτσης': { party: 'ΝΕΑ ΑΡΙΣΤΕΡΑ', color: 'bg-[#e11b22]' },
  'Νατσιός': { party: 'ΝΙΚΗ', color: 'bg-[#092544]' },
  'Άλλος': { party: 'ΑΛΛΟ ΚΟΜΜΑ', color: 'bg-gray-500' },
  'Κανένας': { party: 'ΑΠΟΧΗ', color: 'bg-gray-400' }
};

const displayName: Record<VoteChoice, string> = {
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
  'Κανένας': 'Κανένας',
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
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 whitespace-nowrap overflow-hidden text-ellipsis leading-tight"
                title={displayName[choice] ?? choice}
              >
                {displayName[choice] ?? choice}
              </h3>

              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                <span className={`inline-block w-3 h-3 squared-sm mr-2 ${color}`} />
                {party}
              </p>
            </div>

            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-primary mt-1"
              >
                <Check size={18} />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
