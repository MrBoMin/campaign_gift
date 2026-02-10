# Dream Fest 2026 - QR Landing Page

**New Next International College** Dream Fest event at Hysan Education.

Users scan QR codes from paper airplanes, fill a form, get a lucky draw result, and see college info. An admin dashboard manages voucher inventory.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Google Sheets API** (database)
- **n8n webhook** (email automation)
- **Vercel** (deployment)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```
   GOOGLE_SHEETS_ID=your_spreadsheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=your_private_key
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/xxxxx
   FACEBOOK_PAGE_URL=https://facebook.com/newnextcollege
   ADMIN_PASSWORD=your_admin_password
   NEXT_PUBLIC_MESSENGER_URL=https://m.me/newnextcollege
   NEXT_PUBLIC_WEBSITE_URL=https://newnextcollege.com
   ```

3. Set up Google Sheets with two sheets:
   - **Leads**: Name | Phone | Email | Prize | Redemption Code | Redeemed | Timestamp
   - **Inventory**: Prize Type | Total Stock | Claimed | Weight (%) | Active

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Pages

- `/` — Public landing page (4-step flow: Welcome → Form → Lucky Draw → Result → College Info)
- `/admin` — Admin dashboard (password-protected)

## QR Code

Generate a QR code pointing to your deployed Vercel URL and print it on paper airplanes for the event.

## Deployment

Deploy to Vercel:
```bash
npx vercel
```

Remember to add all environment variables in the Vercel dashboard.
