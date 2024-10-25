#Anime Archive
Anime Archive is a web application that allows users to browse, save, and manage a personalized list of anime. Built with Next.js and Tailwind CSS, it offers a seamless user experience with dynamic content and user authentication.

Features
Browse Anime: Explore a wide range of anime titles with detailed information.
User Authentication: Secure sign-in and sign-up functionality powered by Clerk.
Personal Anime List: Add anime to your list and keep track of your favorites.
Real-Time Data Fetching: The app fetches the latest anime data every time the page reloads.
Database Integration: Utilizes Turso DB to store and manage anime entries.
Technologies Used
Next.js: React framework with server-side rendering capabilities.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Clerk: Authentication service for managing user accounts and sessions.
Turso DB: Database solution for storing anime data.
Vercel: Deployment platform for hosting the application.
Getting Started
Prerequisites
Node.js and npm installed on your machine.
Access to Clerk for authentication services.
Turso DB account for database setup.
Installation
Clone the repository

bash
Copy code
git clone https://github.com/awesomethan/anime-archive.git
cd anime-archive
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env.local file in the root directory and add the following variables:

env
Copy code
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_clerk_sign_in_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_clerk_sign_up_url
Configure the database

Set up your Turso DB and add the connection details to your environment variables if necessary.

Run the development server

bash
Copy code
npm run dev
The app will be available at http://localhost:3000.

Usage
Browsing Anime

Navigate to the home page to see a list of available anime. The list updates every time the page reloads, ensuring you have the most recent data.

User Authentication

Click on the Sign In or Sign Up links to create an account or log in. Authentication is handled securely through Clerk.

Managing Your Anime List

After signing in, you can add anime to your personal list by clicking the Add to List button on an anime's detail page.

Contributing
Contributions are welcome! If you'd like to improve the project, please follow these steps:

Fork the repository

Create a new branch

bash
Copy code
git checkout -b feature/YourFeature
Make your changes

Commit your changes

bash
Copy code
git commit -m "Add YourFeature"
Push to the branch

bash
Copy code
git push origin feature/YourFeature
Open a pull request

License
This project is licensed under the MIT License.

Contact
Author: Ethan
GitHub: awesomethan
Website: [Your Personal Website or Portfolio]
