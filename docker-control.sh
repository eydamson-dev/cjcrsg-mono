#!/bin/bash

set -e

# Use the CJCRSG_ROOT environment variable to set the project root
PROJECT_ROOT="${CJCRSG_ROOT}"

# Load .env file from PROJECT_ROOT, ignoring comments and empty lines
if [ -f "$PROJECT_ROOT/.env" ]; then
    set -o allexport  # Automatically export all variables
    source "$PROJECT_ROOT/.env"
    set +o allexport  # Disable automatic export
fi


function show_help() {
    echo ""
    echo "Usage: cjcrsg (or cjc) <command> [options]"
    echo ""
    echo "Commands:"
    echo "  start [dev|prod] [--logs]   Start all services in the specified environment (defaults to 'dev')"
    echo "                              Use '--logs' to stream real-time logs after starting"
    echo "  stop                        Stop all services in both dev and prod environments"
    echo "  restart [fe|be|db]          Restart the specified service"
    echo "  logs [fe|be|db]             Stream logs for a specific service"
    echo "  run [fe|be] <script>        Run a custom script in the specified service"
    echo ""
    echo "Options:"
    echo "  --help, -h                  Show this help message"
    echo ""
    echo "Examples:"
    echo "  cjcrsg start                Start all services in development mode by default"
    echo "  cjcrsg start prod --logs    Start all services in production mode and stream logs"
    echo "  cjcrsg stop                 Stop all services in both environments"
    echo "  cjcrsg logs be              Stream logs for the backend service"
    echo "  cjcrsg logs cjcrsg-be       Stream logs for the backend service using container name"
    echo "  cjcrsg run fe build         Run 'build' script in the frontend service using pnpm"
    echo ""
}

# Check if CJCRSG_ROOT is set, if not show error
if [[ -z "$PROJECT_ROOT" ]]; then
    echo "Error: CJCRSG_ROOT is not set. Please run install.sh to set it."
    exit 1
fi

# Allow script to be called as "cjc" as well as "cjcrsg"
if [[ $(basename "$0") == "cjc" ]]; then
    alias cjcrsg="cjc"
fi

if [[ $# -eq 0 ]]; then
    show_help
    exit 1
fi

COMMAND=$1
ENVIRONMENT=$2
OPTION=$3
SERVICE=$2
SCRIPT=$3

# Function to change to the project root and execute Docker commands
function run_in_project_root() {
    cd "$PROJECT_ROOT" || exit
    "$@"
}

case $COMMAND in
    start)
        if [ -z "$ENVIRONMENT" ] || [ "$ENVIRONMENT" == "dev" ]; then
            run_in_project_root docker-compose -f docker-compose.dev.yml up -d --build
            echo ""
            echo "Starting services in development mode..."
            echo "Frontend (Next.js) is running at: http://localhost:${FRONTEND_PORT}"
            echo "Backend is running at: http://localhost:${BACKEND_PORT}"
            echo ""
            [ "$OPTION" == "--logs" ] && run_in_project_root docker-compose -f docker-compose.dev.yml logs -f
        elif [ "$ENVIRONMENT" == "prod" ]; then
            run_in_project_root docker-compose -f docker-compose.prod.yml up -d --build
            echo ""
            echo "Starting services in production mode..."
            echo "Frontend (Next.js) is running at: http://localhost:${FRONTEND_PORT}"
            echo "Backend is running at: http://localhost:${BACKEND_PORT}"
            echo ""
            [ "$OPTION" == "--logs" ] && run_in_project_root docker-compose -f docker-compose.prod.yml logs -f
        else
            echo "Invalid environment. Use 'dev' or 'prod'."
            exit 1
        fi
        ;;
    stop)
        if run_in_project_root docker-compose -f docker-compose.dev.yml ps &> /dev/null; then
            run_in_project_root docker-compose -f docker-compose.dev.yml down
            echo "Stopped all services in development environment."
        fi
        if run_in_project_root docker-compose -f docker-compose.prod.yml ps &> /dev/null; then
            run_in_project_root docker-compose -f docker-compose.prod.yml down
            echo "Stopped all services in production environment."
        fi
        ;;
    restart)
        if [ "$SERVICE" == "fe" ] || [ "$SERVICE" == "cjcrsg-fe" ]; then
            run_in_project_root docker restart cjcrsg-fe
        elif [ "$SERVICE" == "be" ] || [ "$SERVICE" == "cjcrsg-be" ]; then
            run_in_project_root docker restart cjcrsg-be
        elif [ "$SERVICE" == "db" ] || [ "$SERVICE" == "cjcrsg-db" ]; then
            run_in_project_root docker restart cjcrsg-db
        else
            echo "Invalid service identifier. Use 'fe', 'be', or 'db' (or full container names)."
            exit 1
        fi
        ;;
    logs)
        if run_in_project_root docker-compose -f docker-compose.dev.yml ps &> /dev/null; then
            COMPOSE_FILE="docker-compose.dev.yml"
        elif run_in_project_root docker-compose -f docker-compose.prod.yml ps &> /dev/null; then
            COMPOSE_FILE="docker-compose.prod.yml"
        else
            echo "No running environment found. Please start services in dev or prod mode."
            exit 1
        fi

        if [ "$SERVICE" == "fe" ] || [ "$SERVICE" == "frontend" ] || [ "$SERVICE" == "cjcrsg-fe" ]; then
            SERVICE="frontend"
        elif [ "$SERVICE" == "be" ] || [ "$SERVICE" == "backend" ] || [ "$SERVICE" == "cjcrsg-be" ]; then
            SERVICE="backend"
        elif [ "$SERVICE" == "db" ] || [ "$SERVICE" == "cjcrsg-db" ]; then
            SERVICE="db"
        fi

        if [ -z "$SERVICE" ]; then
            run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f
        else
            run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f "$SERVICE"
        fi
        ;;
    run)
        if [ "$SERVICE" == "fe" ] || [ "$SERVICE" == "cjcrsg-fe" ]; then
            run_in_project_root docker exec -it cjcrsg-fe pnpm run "$SCRIPT"
        elif [ "$SERVICE" == "be" ] || [ "$SERVICE" == "cjcrsg-be" ]; then
            run_in_project_root docker exec -it cjcrsg-be pnpm run "$SCRIPT"
        else
            echo "Invalid service. Use 'fe', 'be' (or full container names)."
            exit 1
        fi
        ;;
    --help|-h)
        show_help
        ;;
    *)
        echo "Invalid command."
        show_help
        exit 1
        ;;
esac

