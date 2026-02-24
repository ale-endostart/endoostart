#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Supabase Local...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
  exit 1
fi

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | xargs)
fi

# Start docker-compose
echo -e "${YELLOW}📦 Starting Docker containers...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 10

# Check if services are running
echo -e "${YELLOW}🔍 Checking services...${NC}"

if docker ps | grep -q supabase_postgres; then
  echo -e "${GREEN}✓ PostgreSQL is running${NC}"
else
  echo -e "${RED}✗ PostgreSQL failed to start${NC}"
  exit 1
fi

if docker ps | grep -q supabase_studio; then
  echo -e "${GREEN}✓ Supabase Studio is running${NC}"
else
  echo -e "${RED}✗ Supabase Studio failed to start${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ Supabase Local is running!${NC}"
echo ""
echo -e "${YELLOW}📍 Access URLs:${NC}"
echo "   Studio (UI):  http://localhost:3001"
echo "   Database:     postgresql://postgres:postgres@localhost:5432/postgres"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "   1. cd backend && npm install"
echo "   2. npx prisma migrate deploy"
echo "   3. npx prisma db seed"
echo "   4. npm run dev"
echo "   5. In another terminal: cd frontend && npm run dev"
echo ""
