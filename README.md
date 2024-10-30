# CJC Project Setup Guide

This guide will help you set up, configure, and run the CJC Project, including Docker, environment variables, and custom CLI commands.

## Prerequisites

- **Docker**: Ensure Docker is installed on your system. [Get Docker](https://docs.docker.com/get-docker/).
- **Node.js**: Install Node.js (LTS version recommended). [Download Node.js](https://nodejs.org/).
- **pnpm**: Preferred package manager for the project. Install globally:

  ```bash
  npm install -g pnpm
  ```

## Project Structure

The project follows a monorepo structure, with `frontend` and `backend` services, a `database` service, and configuration managed through `.env`.

```
project-root/
├── .env                   # Environment variables for Docker and services
├── docker-compose.dev.yml # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
├── docker-control.sh      # Custom script to manage Docker services
├── install.sh             # Script to set up environment variables and aliases
├── apps/
│   ├── backend/           # NestJS backend application
│   │   └── ...            # Backend source code and configurations
│   └── frontend/          # Next.js frontend application
│       └── ...            # Frontend source code and configurations
└── volumes/
    └── db_data/           # Docker volume for database persistence
```

## Initial Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-directory>
```

### Step 2: Install Dependencies

Run `pnpm install` from the root of the project to install dependencies for both `frontend` and `backend`.

```bash
pnpm install
```

### Step 3: Create and Configure the `.env` File

Create a `.env` file in the project root. Use the following template to configure it:

```env
# Environment mode
NODE_ENV=development  # Change to "production" in production environment

# Frontend and backend ports
FRONTEND_PORT=3000
BACKEND_PORT=3001
DATABASE_PORT=5432

# Backend settings
BACKEND_URL=http://localhost:${BACKEND_PORT}

# Frontend settings
FRONTEND_URL=http://localhost:${FRONTEND_PORT}

# PostgreSQL Setup for Docker Initialization
POSTGRES_USER=cjc_user
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=cjcrsg_db

# PostgreSQL Connection URI for Payload
DATABASE_URI=postgres://cjc_user:secure_password@db:5432/cjcrsg_db

# Database Connection for Application
DB_CONNECTION=postgres
DB_HOST=db
DB_PORT=${DATABASE_PORT}
DB_USER=cjc_user
DB_PASSWORD=secure_password
DB_DATABASE=cjcrsg_db

# Payload CMS Secret
PAYLOAD_SECRET=your_payload_secret
DEBUG=payload:*  # Enables debug-level logging for Payload CMS
```

### Step 4: Run the Installation Script

Run the `install.sh` script to set up the project and add custom commands (`cjcrsg` and `cjc`) for managing Docker services. During installation, select your shell type (bash or zsh) for configuring environment variables.

```bash
./install.sh
```

This will:
- Set the `CJCRSG_ROOT` environment variable to the project root.
- Add the project commands `cjcrsg` and `cjc` to your system path.

### Step 5: Verify Environment Configuration

Ensure the `CJCRSG_ROOT` variable is set. Restart your shell if necessary and verify with:

```bash
echo $CJCRSG_ROOT
```

## Usage Guide

With everything set up, you can now manage Docker services using the `cjcrsg` command.

### Start Services

To start all services in development mode:

```bash
cjcrsg start
```

To start in production mode:

```bash
cjcrsg start prod
```

Add `--logs` to stream logs after starting services:

```bash
cjcrsg start --logs
```

### Stop Services

To stop all services:

```bash
cjcrsg stop
```

### Restart Specific Service

To restart individual services:

```bash
cjcrsg restart fe  # Restart frontend
cjcrsg restart be  # Restart backend
cjcrsg restart db  # Restart database
```

### View Logs for a Specific Service

To view logs for a specific service (frontend, backend, or database):

```bash
cjcrsg logs fe     # View logs for frontend
cjcrsg logs be     # View logs for backend
cjcrsg logs db     # View logs for database
```

### Run Custom Scripts in the `frontend` or `backend` Service

To execute custom scripts defined in `package.json` within the frontend or backend:

```bash
cjcrsg run fe <script_name>
cjcrsg run be <script_name>
```

## Troubleshooting

- **Error loading environment variables**: Ensure that `.env` exists in the project root, and all variables are correctly defined.
- **Custom commands not recognized**: Ensure `CJCRSG_ROOT` is set in your shell’s configuration file (e.g., `.bashrc` or `.zshrc`). Run `source ~/.bashrc` or `source ~/.zshrc` if needed.

## Additional Information

This project leverages the latest versions of NestJS, Payload CMS, and Next.js for a unified frontend and backend application. Refer to individual service documentation for more details on extending the app.

- [NestJS Documentation](https://docs.nestjs.com/)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

This setup guide should cover everything needed to configure, start, and manage the CJC Project. Let me know if you need any further details or adjustments!
