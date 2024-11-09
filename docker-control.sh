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
    echo "  start [prod] [--logs]       Start all services in development mode by default"
    echo "                              Use 'prod' to start in production mode"
    echo "                              Use '--logs' to stream real-time logs after starting"
    echo "  stop                        Stop all services"
    echo "  restart [frontend|db]       Restart the specified service"
    echo "  logs [frontend|db]          Stream logs for a specific service"
    echo ""
    echo "Options:"
    echo "  --help, -h                  Show this help message"
    echo ""
    echo "Examples:"
    echo "  cjcrsg start                Start all services in development mode"
    echo "  cjcrsg start prod --logs    Start all services in production mode and stream logs"
    echo "  cjcrsg stop                 Stop all services"
    echo "  cjcrsg logs frontend        Stream logs for the frontend service"
    echo ""
}

# Check if CJCRSG_ROOT is set, if not show error
if [[ -z "$PROJECT_ROOT" ]]; then
    echo "Error: CJCRSG_ROOT is not set. Please run install.sh to set it."
    exit 1
fi

if [[ $# -eq 0 ]]; then
    show_help
    exit 1
fi

COMMAND=$1
ENVIRONMENT=$2
OPTION=$3

# Determine the docker-compose file based on the environment
COMPOSE_FILE="docker-compose.dev.yml"
if [[ "$ENVIRONMENT" == "prod" ]]; then
    COMPOSE_FILE="docker-compose.prod.yml"
fi

# Function to change to the project root and execute Docker commands
function run_in_project_root() {
    cd "$PROJECT_ROOT" || exit
    "$@"
}

case $COMMAND in
    start)
        run_in_project_root docker-compose -f "$COMPOSE_FILE" up -d --build
        echo "Starting all services in ${ENVIRONMENT:-development} mode..."
        echo "Frontend is running at: http://localhost:${FRONTEND_PORT}"
        [ "$OPTION" == "--logs" ] && run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f
        ;;
    stop)
        run_in_project_root docker-compose -f docker-compose.dev.yml down
        run_in_project_root docker-compose -f docker-compose.prod.yml down
        echo "Stopped all services."
        ;;
    restart)
        SERVICE=$ENVIRONMENT
        if [ "$SERVICE" == "frontend" ] || [ "$SERVICE" == "cjcrsg-fe" ]; then
            run_in_project_root docker restart cjcrsg-fe
        elif [ "$SERVICE" == "db" ] || [ "$SERVICE" == "cjcrsg-db" ]; then
            run_in_project_root docker restart cjcrsg-db
        else
            echo "Invalid service identifier. Use 'frontend' or 'db'."
            exit 1
        fi
        ;;
    logs)
        SERVICE=$ENVIRONMENT
        if [ "$SERVICE" == "frontend" ] || [ "$SERVICE" == "cjcrsg-fe" ]; then
            SERVICE="frontend"
        elif [ "$SERVICE" == "db" ] || [ "$SERVICE" == "cjcrsg-db" ]; then
            SERVICE="db"
        else
            echo "Invalid service identifier. Use 'frontend' or 'db'."
            exit 1
        fi
        run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f "$SERVICE"
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
