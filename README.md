# Ελληνικές Εκλογές 2024 - Δημοσκόπηση

Μια μοντέρνα διαδικτυακή εφαρμογή ψηφοφορίας για την δημοσκόπηση των βουλευτικών εκλογών. Η εφαρμογή επιτρέπει στους επισκέπτες να ψηφίσουν για τον καλύτερο Πρωθυπουργό και να δουν τα αποτελέσματα σε πραγματικό χρόνο.

## Χαρακτηριστικά

- 🗳️ **Ψηφοφορία με μία ψήφο ανά IP**: Κάθε IP μπορεί να ψηφίσει μόνο μία φορά, αλλά μπορεί να αλλάξει την επιλογή του
- 📊 **Αποτελέσματα σε πραγματικό χρόνο**: Γράφημα ράβδων με τα αποτελέσματα και τα ποσοστά
- 🎨 **Μοντέρνο UI**: Χρησιμοποιεί shadcn/ui και Tailwind CSS
- 🌙 **Dark Mode**: Υποστηρίζει σκοτεινό θέμα
- 📱 **Responsive**: Προσαρμοσμένο για όλες τις συσκευές
- 🔒 **Ασφάλεια**: IP hashing για προστασία της ιδιωτικότητας
- ⚡ **Γρήγορη απόκριση**: Framer Motion animations και loading states

## Τεχνολογίες

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod
- **Deployment**: Vercel

## Εγκατάσταση

### Προαπαιτούμενα

- Node.js 18+ 
- npm ή yarn
- Supabase account

### Βήματα

1. **Clone το repository**
   ```bash
   git clone <repository-url>
   cd elect
   ```

2. **Εγκατάσταση dependencies**
   ```bash
   npm install
   ```

3. **Ρύθμιση environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Ενημερώστε το `.env.local` με τις δικές σας τιμές:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   IP_HASH_SECRET=your_super_secret_random_string
   ```

4. **Ρύθμιση Supabase**
   - Δημιουργήστε ένα νέο project στο Supabase
   - Εκτελέστε το SQL από το `supabase.sql` στο SQL Editor
   - Αντιγράψτε το URL και το service role key

5. **Εκκίνηση development server**
   ```bash
   npm run dev
   ```

Η εφαρμογή θα είναι διαθέσιμη στο `http://localhost:3000`

## Δομή Project

```
src/
├── app/
│   ├── api/
│   │   ├── vote/route.ts      # API για ψηφοφορία
│   │   └── results/route.ts   # API για αποτελέσματα
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Κύρια σελίδα
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── VoteOptionCard.tsx     # Κάρτα επιλογής ψηφοφορίας
│   ├── ResultsChart.tsx       # Γράφημα αποτελεσμάτων
│   └── Loader.tsx             # Loading component
└── lib/
    ├── schema.ts              # Zod schemas
    ├── hash.ts                # IP hashing utilities
    ├── ip.ts                  # IP extraction
    ├── supabaseAdmin.ts       # Supabase admin client
    └── utils.ts               # Utility functions
```

## API Endpoints

### POST /api/vote
Ψηφοφορία για έναν υποψήφιο
```json
{
  "choice": "Μητσοτάκης"
}
```

### GET /api/vote
Λήψη της τρέχουσας ψήφου του χρήστη (αν υπάρχει)

### GET /api/results
Λήψη των αποτελεσμάτων
```json
{
  "total": 1234,
  "data": [
    {
      "choice": "Μητσοτάκης",
      "count": 456,
      "pct": 37.0
    }
  ]
}
```

## Deployment

### Vercel

1. **Push στον GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import στο Vercel**
   - Πηγαίνετε στο [Vercel](https://vercel.com)
   - Import το GitHub repository
   - Προσθέστε τα environment variables
   - Deploy

### Environment Variables στο Vercel

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `IP_HASH_SECRET`

## Ασφάλεια & Ιδιωτικότητα

- **IP Hashing**: Τα IP addresses δεν αποθηκεύονται ως plain text, αλλά ως HMAC-SHA256 hash
- **Rate Limiting**: Προστασία από πολλαπλές ψήφους
- **Input Validation**: Zod validation για όλα τα inputs
- **RLS**: Row Level Security ενεργοποιημένο στο Supabase

## Σημειώσεις

- Η εφαρμογή είναι μη επίσημη και τα αποτελέσματα είναι ενδεικτικά
- Η IP-based ψηφοφορία δεν είναι 100% ασφαλής (NAT, VPN, κλπ.)
- Προτεινόμενη βελτίωση: Rate limiting για updates

## License

MIT License
