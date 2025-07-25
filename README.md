# instinctive-studio-assessment

A modern, dark-themed incident management dashboard built with Next.js, Prisma, and Supabase/Postgres. Features include a timeline ruler, incident grid, incident player with camera switching, and full CRUD integration with a Prisma/Postgres backend.

---

**Repository:** [yashsuthar00/instinctive-studio-assessment](https://github.com/yashsuthar00/instinctive-studio-assessment)

**Demo:** [instinctive.yashsuthar.com](https://instinctive.yashsuthar.com)

---

## Features
- **Dark theme** UI with responsive layout
- **Incident List** with resolve action, camera names, and skeleton loaders
- **Incident Player** with camera switcher and skeleton loader
- **Timeline Ruler** with 24-hour SVG timeline and incident markers
- **Prisma/Postgres** backend with Camera and Incident models
- **Seed script** generates demo data with 3 camera feeds per incident

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yashsuthar00/instinctive-studio-assessment.git
cd instinctive-studio-assessment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your database
- Create a Postgres database (e.g., with Supabase or locally)
- Copy your connection string (e.g., `postgresql://user:password@host:port/dbname`)
- Create a `.env` file in the root and add:
  ```env
  DATABASE_URL="<your-connection-string>"
  ```

### 4. Generate and push the Prisma schema
```bash
npx prisma generate
npx prisma db push
```

### 5. Seed the database with demo data
This will create 12 incidents, each with 3 unique camera feeds (36 cameras/incidents total), and use Unsplash images for thumbnails.

```bash
npx prisma db seed
```

If you get errors, you can also run the seed script directly:
```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

---

## Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure
- `src/app/components/` – All main UI components (Navbar, IncidentList, IncidentPlayer, TimelineRuler)
- `prisma/schema.prisma` – Prisma schema for Camera and Incident models
- `prisma/seed.ts` – Seed script for demo data
- `src/app/api/` – API endpoints for incidents
- `public/` – Static assets and icons

---

## Customization
- **Add more incidents/cameras:** Edit `prisma/seed.ts`
- **Change database:** Update `DATABASE_URL` in `.env`
- **Change theme/colors:** Edit `src/app/globals.css` and component styles

---

## Useful Commands
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npx prisma generate` – Generate Prisma client
- `npx prisma db push` – Push schema to database
- `npx prisma db seed` – Seed the database with demo data

---

## Credits
- Built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [Supabase](https://supabase.com/), and [Unsplash](https://unsplash.com/) images.

---

## License
MIT
