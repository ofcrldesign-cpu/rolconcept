#!/usr/bin/env bash
# ==============================================================================
# ROL CONCEPT — Script de Publicação e Sincronização com o GitHub (Bash)
# Repositório: https://github.com/ofcrldesign-cpu/rolconcept.git
# ==============================================================================

set -e

REMOTE_URL="https://github.com/ofcrldesign-cpu/rolconcept.git"
BRANCH="main"

echo "=================================================="
echo "  ROL CONCEPT - Conectando e Publicando no GitHub  "
echo "=================================================="

# 1. Inicializar git caso não exista
if [ ! -d ".git" ]; then
  echo "[1/4] Inicializando repositório Git local..."
  git init -b "$BRANCH"
else
  echo "[1/4] Ajustando branch principal para '$BRANCH'..."
  git branch -M "$BRANCH"
fi

# 2. Configurar remote
echo "[2/4] Configurando remote origin ($REMOTE_URL)..."
if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

# 3. Adicionar arquivos e commitar
echo "[3/4] Preparando arquivos..."
git add .
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "Commitando alterações..."
  git commit -m "chore: sincronização automática do projeto ROL CONCEPT"
else
  echo "Nenhuma alteração pendente de commit."
fi

# 4. Push
echo "[4/4] Enviando para o GitHub ($BRANCH)..."
git push -u origin "$BRANCH"

echo "=================================================="
echo "  Publicação realizada com SUCESSO no GitHub!     "
echo "  URL: https://github.com/ofcrldesign-cpu/rolconcept"
echo "=================================================="
