'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PartyChoice } from '@/lib/schema';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PartyVoteOptionCardProps {
  choice: PartyChoice;
  isSelected: boolean;
  onSelect: (choice: PartyChoice) => void;
  isLoading?: boolean;
}

const partyInfo: Record<PartyChoice, { color: string }> = {
  'ΝΔ': { color: 'bg-[#1a5cc6]' },
  'ΠΑΣΟΚ': { color: 'bg-[#027b3c]' },
  'ΠΛΕΥΣΗ ΕΛΕΥΘΕΡΙΑΣ': { color: 'bg-[#af3b8b]' },
  'ΦΩΝΗ ΛΟΓΙΚΗΣ': { color: 'bg-[#1863dc]' },
  'ΚΚΕ': { color: 'bg-[#e70a11]' },
  'ΕΛΛΗΝΙΚΗ ΛΥΣΗ': { color: 'bg-[#4db2ec]' },
  'ΚΙΝΗΜΑ ΔΗΜΟΚΡΑΤΙΑΣ': { color: 'bg-[#5b15a7]' },
  'ΣΥΡΙΖΑ': { color: 'bg-[#774fa0]' },
  'ΝΕΑ ΑΡΙΣΤΕΡΑ': { color: 'bg-[#e11b22]' },
  'ΝΙΚΗ': { color: 'bg-[#092544]' },
  'ΑΛΛΟ ΚΟΜΜΑ': { color: 'bg-gray-500' },
  'ΑΠΟΧΗ': { color: 'bg-gray-400' }
};

export function PartyVoteOptionCard({ 
  choice, 
  isSelected, 
  onSelect, 
  isLoading = false 
}: PartyVoteOptionCardProps) {
  const { color } = partyInfo[choice];

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
            <div className="flex-1 flex flex-col items-center">
              <div className="mb-2">
                <span className={`inline-block w-4 h-4 rounded-sm ${color}`} />
              </div>
              <h3
                className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 text-center whitespace-nowrap overflow-hidden text-ellipsis leading-tight"
                title={choice}
              >
                {choice}
              </h3>
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
