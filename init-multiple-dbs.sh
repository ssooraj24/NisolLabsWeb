#!/bin/bash
# =============================================================================
# Automated Multi-Database Provisioner for PostgreSQL 16
# Creates databases and enables pgvector extension automatically
# =============================================================================

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "Creating database '$database' with pgvector extension..."
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    SELECT 'CREATE DATABASE $database'
	    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$database')\gexec
	    \c $database
	    CREATE EXTENSION IF NOT EXISTS vector;
EOSQL
}

if [ -n "${POSTGRES_MULTIPLE_DATABASES:-}" ]; then
	echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		create_user_and_database $db
	done
	echo "Multiple databases initialized successfully."
fi
