import { z } from 'zod';

export const VOTE_CHOICES = [
  'Μητσοτάκης',
  'Ανδρουλάκης',
  'Κωνσταντοπούλου',
  'Λατινοπούλου',
  'Κουτσούμπας',
  'Βελόπουλος',
  'Κασσελάκης',
  'Φάμελλος',
  'Τσίπρας',
  'Χαρίτσης',
  'Νατσιός',
  'Άλλος',
  'Κανένας'
] as const;

export type VoteChoice = typeof VOTE_CHOICES[number];

export const voteSchema = z.object({
  choice: z.enum(VOTE_CHOICES)
});

export const resultsSchema = z.object({
  total: z.number(),
  data: z.array(z.object({
    choice: z.enum(VOTE_CHOICES),
    count: z.number(),
    pct: z.number()
  }))
});

export type VoteRequest = z.infer<typeof voteSchema>;
export type ResultsResponse = z.infer<typeof resultsSchema>;
