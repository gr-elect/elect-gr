import { z } from 'zod';

export const VOTE_CHOICES = [
  'Μητσοτάκης','Ανδρουλάκης','Κωνσταντοπούλου','Λατινοπούλου','Κουτσούμπας',
  'Βελόπουλος','Κασσελάκης','Φάμελλος','Χαρίτσης','Νατσιός','Άλλος','Κανένας'
] as const;

export const PARTY_CHOICES = [
  'ΝΔ','ΠΑΣΟΚ','ΠΛΕΥΣΗ ΕΛΕΥΘΕΡΙΑΣ','ΦΩΝΗ ΛΟΓΙΚΗΣ','ΚΚΕ',
  'ΕΛΛΗΝΙΚΗ ΛΥΣΗ','ΚΙΝΗΜΑ ΔΗΜΟΚΡΑΤΙΑΣ','ΣΥΡΙΖΑ','ΝΕΑ ΑΡΙΣΤΕΡΑ','ΝΙΚΗ','ΑΛΛΟ ΚΟΜΜΑ','ΑΠΟΧΗ'
] as const;

export const POLL_TYPES = ['prime_minister', 'party_preference'] as const;

export type VoteChoice = typeof VOTE_CHOICES[number];
export type PartyChoice = typeof PARTY_CHOICES[number];
export type PollType = typeof POLL_TYPES[number];

export const GENDER_CHOICES = ['Άνδρας', 'Γυναίκα', 'Άλλο', 'Δεν απαντώ'] as const;
export const AGE_GROUPS = ['17-24', '25-34', '35-44', '45-54', '55-64', '65+'] as const;

export type Gender = typeof GENDER_CHOICES[number];
export type AgeGroup = typeof AGE_GROUPS[number];

export const demographicsSchema = z.object({
  gender: z.enum(GENDER_CHOICES),
  ageGroup: z.enum(AGE_GROUPS),
  municipality: z.string().min(1, 'Παρακαλώ επιλέξτε δήμο')
});

export const voteSchema = z.object({
  choice: z.enum(VOTE_CHOICES),
  demographics: demographicsSchema,
  pollType: z.enum(POLL_TYPES).default('prime_minister')
});

export const partyVoteSchema = z.object({
  choice: z.enum(PARTY_CHOICES),
  demographics: demographicsSchema,
  pollType: z.enum(POLL_TYPES).default('party_preference')
});

export const resultsSchema = z.object({
  total: z.number(),
  data: z.array(z.object({
    choice: z.enum(VOTE_CHOICES),
    count: z.number(),
    pct: z.number()
  }))
});

export type Demographics = z.infer<typeof demographicsSchema>;
export type VoteRequest = z.infer<typeof voteSchema>;
export type ResultsResponse = z.infer<typeof resultsSchema>;
