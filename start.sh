#!/bin/bash

# ============================================
# ARQUIVO: start.sh (Linux/Mac)
# ============================================
# Salve este arquivo como: start.sh
# Execute: chmod +x start.sh && ./start.sh
# ============================================

echo "🌃 =============================================="
echo "   PROTOCOLOS DA MENTE SINTÉTICA"
echo "   Neo-Tokyo AI System - Startup Script"
echo "============================================== 🌃"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Função para limpar ao sair
cleanup() {
    echo ""
    echo -e "${YELLOW}⏹️  Encerrando serviços...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Serviços encerrados${NC}"
    exit 0
}

# Trap para capturar Ctrl+C
trap cleanup SIGINT SIGTERM

# Verificar se Java está instalado
echo -e "${BLUE}🔍 Verificando Java...${NC}"
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java não encontrado. Instale Java 17 ou superior.${NC}"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo -e "${RED}❌ Java 17+ necessário. Versão atual: $JAVA_VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Java $JAVA_VERSION encontrado${NC}"

# Verificar se Node.js está instalado
echo -e "${BLUE}🔍 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Instale Node.js 18 ou superior.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) encontrado${NC}"

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v) encontrado${NC}"

echo ""

# Verificar se as portas estão disponíveis
echo -e "${BLUE}🔍 Verificando portas...${NC}"
if check_port 8080; then
    echo -e "${RED}❌ Porta 8080 já está em uso. Libere a porta e tente novamente.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Porta 8080 disponível${NC}"

if check_port 5173; then
    echo -e "${RED}❌ Porta 5173 já está em uso. Libere a porta e tente novamente.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Porta 5173 disponível${NC}"

echo ""

# Instalar dependências do frontend se necessário
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependências do frontend...${NC}"
    cd frontend
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao instalar dependências do frontend${NC}"
        exit 1
    fi
    cd ..
    echo -e "${GREEN}✅ Dependências do frontend instaladas${NC}"
    echo ""
fi

# Compilar backend se necessário
if [ ! -d "backend/target" ]; then
    echo -e "${YELLOW}🔨 Compilando backend...${NC}"
    cd backend
    mvn clean install -DskipTests
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao compilar backend${NC}"
        exit 1
    fi
    cd ..
    echo -e "${GREEN}✅ Backend compilado com sucesso${NC}"
    echo ""
fi

# Criar diretório de logs
mkdir -p logs

echo -e "${BLUE}🚀 Iniciando serviços...${NC}"
echo ""

# Iniciar backend em background
echo -e "${YELLOW}📡 Iniciando Backend (porta 8080)...${NC}"
cd backend
mvn spring-boot:run > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"

# Aguardar backend inicializar com loop
echo -e "${YELLOW}⏳ Aguardando backend inicializar...${NC}"
BACKEND_READY=0
for i in {1..30}; do
    if check_port 8080; then
        echo -e "${GREEN}✅ Backend online!${NC}"
        BACKEND_READY=1
        break
    fi
    echo -ne "\r   Tentativa $i/30..."
    sleep 1
done

if [ $BACKEND_READY -eq 0 ]; then
    echo -e "${RED}❌ Backend falhou ao iniciar. Verifique logs/backend.log${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""

# Iniciar frontend em background
echo -e "${YELLOW}🎨 Iniciando Frontend (porta 5173)...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"

# Aguardar frontend inicializar com loop
echo -e "${YELLOW}⏳ Aguardando frontend inicializar...${NC}"
FRONTEND_READY=0
for i in {1..15}; do
    if check_port 5173; then
        echo -e "${GREEN}✅ Frontend online!${NC}"
        FRONTEND_READY=1
        break
    fi
    echo -ne "\r   Tentativa $i/15..."
    sleep 1
done

if [ $FRONTEND_READY -eq 0 ]; then
    echo -e "${RED}❌ Frontend falhou ao iniciar. Verifique logs/frontend.log${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo -e "${GREEN}✨ =============================================="
echo "   SISTEMA ONLINE!"
echo "============================================== ✨${NC}"
echo ""
echo -e "${BLUE}📍 URLs:${NC}"
echo -e "   Backend:  ${YELLOW}http://localhost:8080${NC}"
echo -e "   Frontend: ${YELLOW}http://localhost:5173${NC}"
echo ""
echo -e "${BLUE}📊 Logs:${NC}"
echo -e "   Backend:  logs/backend.log"
echo -e "   Frontend: logs/frontend.log"
echo ""
echo -e "${BLUE}🔧 PIDs:${NC}"
echo -e "   Backend:  $BACKEND_PID"
echo -e "   Frontend: $FRONTEND_PID"
echo ""
echo -e "${YELLOW}⚠️  Para parar os serviços: Pressione CTRL+C${NC}"
echo ""
echo -e "${GREEN}🌆 Bem-vindo a Neo-Tóquio! 🌃${NC}"
echo ""

# Manter script rodando
wait
