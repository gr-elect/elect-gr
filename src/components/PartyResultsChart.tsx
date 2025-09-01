'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyChoice } from '@/lib/schema';

interface PartyResultsData {
  choice: PartyChoice;
  count: number;
  pct: number;
}

interface PartyResultsResponse {
  total: number;
  data: PartyResultsData[];
}

interface PartyResultsChartProps {
  results: PartyResultsResponse;
}

export function PartyResultsChart({ results }: PartyResultsChartProps) {
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

  // Ταξινόμηση από υψηλότερο προς χαμηλότερο ποσοστό
  const sortedData = [...results.data].sort((a, b) => b.pct - a.pct);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-center">Αποτελέσματα Κομμάτων</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map((item) => (
            <div key={item.choice} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: getColorForChoice(item.choice) }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.choice}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {item.pct}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    ({item.count} ψήφοι)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${item.pct}%`,
                    backgroundColor: getColorForChoice(item.choice),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Συνολικές ψήφοι: <span className="font-semibold">{results.total}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
