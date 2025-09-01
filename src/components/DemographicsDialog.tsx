'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, Users, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VoteChoice, GENDER_CHOICES, AGE_GROUPS, Demographics } from '@/lib/schema';
import { getAllMunicipalities, searchMunicipalities, Municipality } from '@/lib/municipalities';
import { loadDemographics } from '@/lib/cookies';
import { useEffect } from 'react';

interface DemographicsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (choice: VoteChoice, demographics: Demographics) => void;
  selectedChoice: VoteChoice;
  isLoading?: boolean;
}

export function DemographicsDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedChoice,
  isLoading = false 
}: DemographicsDialogProps) {
  const [gender, setGender] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [municipality, setMunicipality] = useState<string>('');
  const [municipalityOpen, setMunicipalityOpen] = useState(false);
  const [municipalitySearch, setMunicipalitySearch] = useState('');

  const municipalities = getAllMunicipalities();
  const filteredMunicipalities = searchMunicipalities(municipalitySearch);

  useEffect(() => {
    // Load saved demographics when dialog opens
    if (isOpen) {
      const savedDemographics = loadDemographics();
      if (savedDemographics) {
        setGender(savedDemographics.gender);
        setAgeGroup(savedDemographics.ageGroup);
        setMunicipality(savedDemographics.municipality);
      }
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!gender || !ageGroup || !municipality) return;

    const demographics: Demographics = {
      gender: gender as any,
      ageGroup: ageGroup as any,
      municipality
    };

    onSubmit(selectedChoice, demographics);
  };

  const isValid = gender && ageGroup && municipality;

  const handleClose = () => {
    setGender('');
    setAgeGroup('');
    setMunicipality('');
    setMunicipalitySearch('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900 dark:text-gray-100">
            Δημογραφικά Στοιχεία
          </DialogTitle>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            Παρακαλώ συμπληρώστε τα παρακάτω στοιχεία για την ολοκλήρωση της ψήφου σας
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
                    {/* Gender Selection */}
                    <div className="space-y-3">
            <Label className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-700 dark:text-blue-400" />
              Φύλο
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {GENDER_CHOICES.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`gender-${option}`}
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                  />
                  <label
                    htmlFor={`gender-${option}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Age Group Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-700 dark:text-blue-400" />
              Ηλικιακή Ομάδα
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {AGE_GROUPS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`age-${option}`}
                    name="ageGroup"
                    value={option}
                    checked={ageGroup === option}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                  />
                  <label
                    htmlFor={`age-${option}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Municipality Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-700 dark:text-blue-400" />
              Δήμος
            </Label> 
            <Popover open={municipalityOpen} onOpenChange={setMunicipalityOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={municipalityOpen}
                  className="w-full justify-between"
                >
                  {municipality || "Επιλέξτε δήμο..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Αναζήτηση δήμου..." 
                    value={municipalitySearch}
                    onValueChange={setMunicipalitySearch}
                  />
                  <CommandList>
                    <CommandEmpty>Δεν βρέθηκαν αποτελέσματα.</CommandEmpty>
                    <CommandGroup>
                      {filteredMunicipalities.slice(0, 100).map((mun) => (
                        <CommandItem
                          key={`${mun.region}-${mun.regionalUnit}-${mun.municipality}`}
                          value={mun.municipality}
                          onSelect={() => {
                            setMunicipality(mun.municipality);
                            setMunicipalityOpen(false);
                            setMunicipalitySearch('');
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              municipality === mun.municipality ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div>
                            <div className="font-medium">{mun.municipality}</div>
                            <div className="text-xs text-gray-500">
                              {mun.regionalUnit}, {mun.region}
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={isLoading}
          >
            Ακύρωση
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className="flex-1"
          >
            {isLoading ? 'Υποβολή...' : 'Υποβολή Ψήφου'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
