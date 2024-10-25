# Anime Archive
Anime Archive is a web application that allows users to browse, save, and manage a personalized list of anime. Built with Next.js and Tailwind CSS, it offers a seamless user experience with dynamic content and user authentication.

## Features
- **_Browse Anime_**: Explore a wide range of anime with detailed information
- **_User Authentication_**: Secure sign-in and sign-up functionality powered by Clerk
- **_Personal Anime List_**: Add anime to your list and keep track of your favorites
- **_Real-Time Data Fetching_**: The app fetches the latest anime data every time the page reloads
- **_Database Integration_**: Configured Prisma with PostgreSQL database for efficient data storage and seamless watchlist management


**Technologies Used**: Next.js, Tailwind CSS, Clerk, Turso DB, Vercel

Check it out [here](https://ethans-anime-archive.vercel.app/) or follow the steps below to run it locally.


## Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- Access to **Clerk** for authentication services.
- Access to **Turso DB** for anime list database.

### Installation
1. **Clone the repository**  
   `git clone https://github.com/awesomethan/anime-archive.git && cd anime-archive`

2. **Install dependencies**  
   `npm install`

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory and add the following variables:  
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  
   `CLERK_SECRET_KEY`  
   `NEXT_PUBLIC_CLERK_SIGN_IN_URL`  
   `NEXT_PUBLIC_CLERK_SIGN_UP_URL`

4. **Configure the database**  
   Add your Turso DB connection details to the environment variables:  
   `TURSO_AUTH_TOKEN`  
   `TURSO_DATABASE_URL`

6. **Run the development server**  
   `npm run dev`  
   The app will be available at `http://localhost:3000`.
