#!/bin/bash
set -e

if [ -f tmp/pids/server.pid ]; then
  rm -f tmp/pids/server.pid
fi

echo "Waiting for MySQL..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 0.5
done
echo "MySQL is up"

exec "$@"
