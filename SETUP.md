# Οδηγίες Ρύθμισης

## 1. Δημιουργία .env.local

Δημιουργήστε ένα αρχείο `.env.local` στον root φάκελο με το εξής περιεχόμενο:

```env
# Supabase Configuration (αντικαταστήστε με τις δικές σας τιμές)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# IP Hashing Secret (αντικαταστήστε με ένα τυχαίο string)
IP_HASH_SECRET=your_super_secret_random_string_here

# Environment
NODE_ENV=development
```

## 2. Ρύθμιση Supabase

1. Πηγαίνετε στο [Supabase](https://supabase.com) και δημιουργήστε ένα νέο project
2. Ανοίξτε το SQL Editor
3. Αντιγράψτε και εκτελέστε το περιεχόμενο του `supabase.sql`
4. Πηγαίνετε στο Settings > API
5. Αντιγράψτε το Project URL και το service_role key
6. Ενημερώστε το `.env.local` με αυτές τις τιμές

## 3. Εκκίνηση Development Server

```bash
npm run dev
```

Η εφαρμογή θα είναι διαθέσιμη στο `http://localhost:3000`

## Σημείωση

Χωρίς το `.env.local` αρχείο, η εφαρμογή δεν θα λειτουργήσει σωστά καθώς χρειάζεται τις Supabase credentials.
