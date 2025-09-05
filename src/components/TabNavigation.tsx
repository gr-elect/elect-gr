'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    if (pathname === '/dimoskopisi-komma') return 'party';
    return 'prime-minister';
  };

  const handleTabChange = (value: string) => {
    if (value === 'party') {
      router.push('/dimoskopisi-komma');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger 
            value="prime-minister"
            className="text-sm font-medium px-4 py-2 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
          >
            Πρωθυπουργός
          </TabsTrigger>
          <TabsTrigger 
            value="party"
            className="text-sm font-medium px-4 py-2 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
          >
            Κόμμα
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
