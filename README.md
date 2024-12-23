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

The project follows a monorepo structure, with `frontend` and `database` services, and configuration managed through `.env`.

```
project-root/
├── .env                      # Environment variables for Docker and services
├── docker-compose.dev.yml    # Docker Compose for development
├── docker-compose.prod.yml   # Docker Compose for production
├── docker-control.sh         # Custom script to manage Docker services
├── install.sh                # Script to set up environment variables and aliases
├── apps/
│   └── frontend/             # Next.js frontend application
│       └── ...               # Frontend source code and configurations
```

The `db_data` volume for database persistence is managed directly by Docker and does not require a folder in the project directory.

## Initial Setup

### Step 1: Clone the Repository

Clone the project repository and navigate into the project directory.

```bash
git clone <your-repo-url>
cd <your-project-directory>
```

### Step 2: Install Dependencies

Navigate to the `frontend` folder and run `pnpm install` to install dependencies for the frontend application.

```bash
cd apps/frontend
pnpm install
cd ../..  # Return to the project root
```

### Step 3: Create and Configure the `.env` File

Create a `.env` file in the project root. Use the following template to configure it:

```env
# Environment mode
NODE_ENV=development  # Change to "production" in production environment

# Frontend port
FRONTEND_PORT=3000

# Database port
DATABASE_PORT=27017

# MongoDB setup for Docker initialization
MONGO_INITDB_ROOT_USERNAME=cjc_user
MONGO_INITDB_ROOT_PASSWORD=secure_password
MONGO_INITDB_DATABASE=cjcrsg_db

# MongoDB URI for Payload
DATABASE_URI=mongodb://cjc_user:secure_password@cjcrsg-db:27017/cjcrsg_db

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

To start and build all services in development mode:

```bash
cjcrsg start --build
```

To start without rebuilding all services in development mode:

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
cjcrsg restart frontend  # Restart frontend
cjcrsg restart db        # Restart database
```

### View Logs for a Specific Service

To view logs for a specific service (frontend or database):

```bash
cjcrsg logs frontend     # View logs for frontend
cjcrsg logs db           # View logs for database
```

### Rebuilding Services

Sometimes its necessary to rebuild specific service (frontend or backend) ie. when you install new npm package or updated the dockerfile.

```bash
cjcrsg rebuild [fe|db]
```

### Run Custom Scripts in the `frontend` Service

To execute custom scripts defined in `package.json` within the frontend:

```bash
cjcrsg run frontend <script_name>
```

## Troubleshooting

- **Error loading environment variables**: Ensure that `.env` exists in the project root, and all variables are correctly defined.
- **Custom commands not recognized**: Ensure `CJCRSG_ROOT` is set in your shell’s configuration file (e.g., `.bashrc` or `.zshrc`). Run `source ~/.bashrc` or `source ~/.zshrc` if needed.

## Additional Information

This project leverages the latest versions of Payload CMS and Next.js for a unified frontend and data application. Refer to individual service documentation for more details on extending the app.

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

