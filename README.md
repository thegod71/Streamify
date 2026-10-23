
## Features

- Feature one-VIDEO CALL
- Feature two-REAL TIME CHAT
- Feature three-SCREEN SHARE

## Tech Stack

- **Frontend:** [e.g., React / Next.js]
- **Backend:** [e.g., Node.js / Express]
- **Database:** [e.g., PostgreSQL / MongoDB]
- **Other:** [e.g., authentication, streaming service]

## Prerequisites

Make sure you have these installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- [Database you use, e.g., PostgreSQL or MongoDB]

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/thegod71/Streamify.git
cd Streamify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Example `.env`:

```env
# App
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=your_database_url

# Auth / API keys
SECRET_KEY=your_secret_key
```

> Never commit your `.env` file. Make sure it is listed in `.gitignore`.

### 4. Set up the database

```bash
# Example, adjust to your ORM/tooling
npx prisma migrate dev
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start the development server     |
| `npm run build`  | Create a production build        |
| `npm start`      | Run the production build         |
| `npm test`       | Run tests                        |
| `npm run lint`   | Lint the codebase                |

## Project Structure

```
Streamify/
├── src/          # Application source code
├── public/       # Static assets
├── .env.example  # Example environment variables
├── package.json
└── README.md
```

## Deployment

1. Set the environment variables on your hosting platform.
2. Run `npm run build`.
3. Start the app with `npm start`.

## Troubleshooting

- **Port already in use:** change `PORT` in `.env`.
- **Module not found:** delete `node_modules` and run `npm install` again.
- **Database connection error:** check `DATABASE_URL` and that the database is running.

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

Specify your license here (e.g., MIT).
 
 
 
 # Streamify
what i learn -> 
1-> in protected  middleware when token find  and set user in req not sent password
Question -> 
1-> why if logout does not return any thing why it is post
sol-> It is because it change something in server side that in clear cookies AND Post method is for operation which the server state GET = "Give me something" and POST = "I want to perform an action"
