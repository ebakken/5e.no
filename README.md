# 5e.no

5e.no is a simple link shortener and contact card sharing service.

This full-stack web application showcases modern form handling and validation, React server actions, and database interaction with Drizzle ORM.

The project is built with Next.js, React, TypeScript, Tailwind CSS, Vercel Postgres, Drizzle, Vercel, Shadcn UI, React Hook Form, and Zod.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vercel](https://vercel.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Project Structure

The project is structured as a Next.js application, with the `app` directory for routes and the `components` directory for reusable components.

The design is based on the [Shadcn UI](https://ui.shadcn.com/) component library, utilizing their recommended form setup with React Hook Form and Zod for validation.

Drizzle ORM is used to interact with the Vercel Postgres database. Configuration is in `drizzle.config.ts`, and the database schema and client are defined in `lib/drizzle.ts`.

React server actions handle database and email service interactions, creating a tight integration between the frontend and backend.

User-created items are stored in both the database and local storage for quick access, sharing, and history viewing.

Form validation is performed with Zod. Validation schemas are defined in the `lib/schemas.ts` directory and used for both frontend and backend validation.

Email notifications are sent using the `nodemailer` package, configured via environment variables, including `EMAIL_REGISTRATION_FILTER` to filter specific registrations.

## Getting Started

The project is designed to run on Vercel with a Vercel Postgres database. To run the project locally:

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Fetch Vercel environment variables with `vercel link` and `vercel env pull .env`
4. Run the development server with `pnpm dev`

## Resources

- [Using Vercel Postgres with Drizzle](https://github.com/vercel/examples/tree/main/storage/postgres-drizzle)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Shadcn/UI Form Handling](https://ui.shadcn.com/docs/components/form)
