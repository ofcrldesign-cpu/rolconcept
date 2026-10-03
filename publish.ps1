# ==============================================================================
# ROL CONCEPT — Script de Publicação e Sincronização com o GitHub (PowerShell)
# Repositório: https://github.com/ofcrldesign-cpu/rolconcept.git
# ==============================================================================

[CmdletBinding()]
param (
    [string]$RemoteUrl = "https://github.com/ofcrldesign-cpu/rolconcept.git",
    [string]$Branch = "main"
)

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  ROL CONCEPT - Conectando e Publicando no GitHub  " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Verificar se o Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git não está instalado ou não foi encontrado no PATH do sistema."
    exit 1
}

# 2. Inicializar repositório Git local se ainda não foi
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Inicializando repositório Git local..." -ForegroundColor Yellow
    git init -b $Branch
} else {
    Write-Host "[1/5] Repositório Git local já inicializado." -ForegroundColor Green
    git branch -M $Branch
}

# 3. Configurar remote 'origin'
Write-Host "[2/5] Configurando remote origin: $RemoteUrl" -ForegroundColor Yellow
$currentRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0 -and $currentRemote) {
    if ($currentRemote -ne $RemoteUrl) {
        Write-Host "Atualizando URL do remote origin..." -ForegroundColor Yellow
        git remote set-url origin $RemoteUrl
    } else {
        Write-Host "Remote origin já configurado corretamente." -ForegroundColor Green
    }
} else {
    git remote add origin $RemoteUrl
    Write-Host "Remote origin adicionado com sucesso." -ForegroundColor Green
}

# 4. Adicionar arquivos e commitar caso necessário
Write-Host "[3/5] Verificando arquivos alterados..." -ForegroundColor Yellow
git add .
$status = git status --porcelain
if ($status) {
    Write-Host "Commitando alterações pendentes..." -ForegroundColor Yellow
    git commit -m "chore: sincronização automática do projeto ROL CONCEPT"
} else {
    Write-Host "Nenhuma alteração não commitada encontrada." -ForegroundColor Green
}

# 5. Realizar o Push para o GitHub
Write-Host "[4/5] Enviando alterações para o GitHub (branch $Branch)..." -ForegroundColor Yellow
git push -u origin $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "==================================================" -ForegroundColor Green
    Write-Host "  Publicação realizada com SUCESSO no GitHub!     " -ForegroundColor Green
    Write-Host "  URL: https://github.com/ofcrldesign-cpu/rolconcept" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Green
} else {
    Write-Host "==================================================" -ForegroundColor Red
    Write-Host "  Falha no envio ou autenticação necessária.      " -ForegroundColor Red
    Write-Host "==================================================" -ForegroundColor Red
    exit $LASTEXITCODE
}
