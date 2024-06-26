# 5e.no

5e.no is a simple link shortening service and a contact card sharing service.

The project is a full-stack web application showcasing modern form handeling andvalidation, react server actions, and database interaction with Drizzle ORM.

The project is built with Next.js, React, TypeScript, Tailwind CSS, Vercel PostgreSQL, Drizzle, Vercel, Shadcn UI, and React Hook Form, and Zod.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel PostgreSQL](https://vercel.com/storage/postgres)
- [Drizzle](https://drizzle.dev/)
- [Vercel](https://vercel.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Project Structure

The project is structured as a Next.js project, with an `app` directory for the different routes, and a `components` directory for the different components.

The design is based on the [Shadcn UI](https://ui.shadcn.com/) component library. This includes following their recommended form setup, which is based on React Hook Form and Zod for validation.

It uses Drizzle ORM to interact with the Vercel PostgreSQL database. The `drizzle.config.ts` file contains the database configuration, and the `lib/drizzle.db` file contains the database schema and database client.

React server-side actions are used to interact with the database and email service, acting as a tight integration between the frontend and backend.

In addition to being stored in the database, a users created items are also stored in localstorage to allow for quick access, sharing and history view of the items.

Form validation is done with Zod, with the validation schema defined in the `lib/schemas` directory. These schemas are then used for form validation in both the frontend and backend.

Email notifications are sent with a 3rd party SMTP service using the `nodemailer` package. The email service is configured in with environment variables, including a `EMAIL_REGISTRATION_FILTER` to only send notifications of ceirtain registrations.

## Getting Started

The project is made to be run on Vercel, with a Vercel PostgreSQL database. To run the project locally, you need to have a Vercel project with a connected Vercel PostgreSQL database.

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Fetch the Vercel environment variables with `vercel link` and `vc env pull .env`
4. Run the development server with `pnpm dev`

## Resources

- [Using Vercel PostgreSQL with Drizzle](https://github.com/vercel/examples/tree/main/storage/postgres-drizzle)
- [Next.js Server Side Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Shadcn/UI Form handeling](https://ui.shadcn.com/docs/components/form)
