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
    echo "  start [--build] [--logs]   Start all services"
    echo "                            Use '--build' to rebuild before starting"
    echo "                            Use '--logs' to stream real-time logs"
    echo "  stop                      Stop all services"
    echo "  restart [frontend|fe|db]  Restart the specified service"
    echo "  rebuild [frontend|fe|db]  Rebuild the specified service's image"
    echo "  logs [frontend|fe|db]     Stream logs for a specific service or all services"
    echo ""
    echo "Options:"
    echo "  --help, -h                Show this help message"
    echo ""
    echo "Examples:"
    echo "  cjcrsg start              Start all services"
    echo "  cjcrsg start --build      Start and rebuild all services"
    echo "  cjcrsg start --logs       Start and stream logs"
    echo "  cjcrsg stop               Stop all services"
    echo "  cjcrsg restart fe         Restart the frontend service"
    echo "  cjcrsg rebuild db         Rebuild the database service"
    echo "  cjcrsg logs               Stream logs for all services"
    echo "  cjcrsg logs fe            Stream logs for the frontend service"
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
SERVICE=$2
OPTION=$3

# Map aliases 'fe' and 'db' to their respective services
if [[ "$SERVICE" == "fe" ]]; then
    SERVICE="frontend"
elif [[ "$SERVICE" == "db" ]]; then
    SERVICE="database"
fi

# Determine the docker-compose file based on the environment
COMPOSE_FILE="docker-compose.dev.yml"
if [[ "$SERVICE" == "prod" ]]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    SERVICE=$OPTION
    OPTION=""
fi

# Function to change to the project root and execute Docker commands
function run_in_project_root() {
    cd "$PROJECT_ROOT" || exit
    "$@"
}

# Main command handler
case $COMMAND in
    start)
        echo "Starting all services in ${SERVICE:-development} mode..."
        if [[ "$SERVICE" == "--build" ]] || [[ "$OPTION" == "--build" ]]; then
            echo "Rebuilding images before starting..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" up -d --build
        else
            run_in_project_root docker-compose -f "$COMPOSE_FILE" up -d
        fi

        echo "Frontend is running at: http://localhost:${FRONTEND_PORT}"

        if [[ "$SERVICE" == "--logs" ]] || [[ "$OPTION" == "--logs" ]]; then
            echo "Tailing logs for all services..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f
        fi
        ;;
    
    stop)
        echo "Stopping all services..."
        run_in_project_root docker-compose -f docker-compose.dev.yml down
        run_in_project_root docker-compose -f docker-compose.prod.yml down
        echo "All services stopped."
        ;;
    
    restart)
        if [[ "$SERVICE" == "frontend" ]] || [[ "$SERVICE" == "cjcrsg-fe" ]]; then
            echo "Restarting frontend service..."
            run_in_project_root docker restart cjcrsg-fe
        elif [[ "$SERVICE" == "db" ]] || [[ "$SERVICE" == "cjcrsg-db" ]]; then
            echo "Restarting database service..."
            run_in_project_root docker restart cjcrsg-db
        else
            echo "Invalid service identifier. Use 'frontend', 'fe', 'db'."
            exit 1
        fi
        ;;
    
    rebuild)
        if [[ "$SERVICE" == "frontend" ]] || [[ "$SERVICE" == "cjcrsg-fe" ]]; then
            echo "Rebuilding the frontend service..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" build frontend
            echo "Frontend service rebuilt successfully."
        elif [[ "$SERVICE" == "db" ]] || [[ "$SERVICE" == "cjcrsg-db" ]]; then
            echo "Rebuilding the database service..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" build db
            echo "Database service rebuilt successfully."
        else
            echo "Invalid service identifier. Use 'frontend', 'fe', 'db'."
            exit 1
        fi
        ;;
    
    logs)
        if [[ -z "$SERVICE" ]]; then
            echo "Tailing logs for all services..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f
        elif [[ "$SERVICE" == "fe" ]] || [[ "$SERVICE" == "frontend" ]] || [[ "$SERVICE" == "cjcrsg-fe" ]]; then
            echo "Tailing logs for the frontend service..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f frontend
        elif [[ "$SERVICE" == "db" ]] || [[ "$SERVICE" == "database" ]] || [[ "$SERVICE" == "cjcrsg-db" ]]; then
            echo "Tailing logs for the database service..."
            run_in_project_root docker-compose -f "$COMPOSE_FILE" logs -f db
        else
            echo "Invalid service identifier. Use 'frontend', 'fe', 'db', or leave empty for all services."
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
