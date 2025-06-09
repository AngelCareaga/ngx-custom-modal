#!/bin/bash

set -e

echo "🚀 Iniciando proceso de release..."

# Verificar rama
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "develop" ]; then
  echo "❌ Error: Debes estar en la rama 'main' o 'develop'"
  exit 1
fi

# Verificar estado limpio
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Error: Hay cambios sin commitear"
  exit 1
fi

# Opciones de release
echo "Selecciona el tipo de release:"
echo "1) patch (bug fixes)"
echo "2) minor (nuevas features)"
echo "3) major (breaking changes)"
echo "4) prerelease (beta)"

read -p "Opción (1-4): " option

case $option in
  1) RELEASE_TYPE="patch" ;;
  2) RELEASE_TYPE="minor" ;;
  3) RELEASE_TYPE="major" ;;
  4) RELEASE_TYPE="prerelease" ;;
  *) echo "❌ Opción inválida"; exit 1 ;;
esac

# Confirmar
echo "📋 Resumen:"
echo "   - Rama: $CURRENT_BRANCH"
echo "   - Tipo: $RELEASE_TYPE"
echo ""
read -p "¿Continuar? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "❌ Operación cancelada"
  exit 0
fi

# Trigger GitHub Action
echo "🚀 Triggering GitHub Action..."
gh workflow run release.yml \
  -f release_type="$RELEASE_TYPE" \
  -f prerelease="$([ "$RELEASE_TYPE" = "prerelease" ] && echo true || echo false)"

echo "✅ Workflow iniciado! Puedes seguir el progreso en:"
echo "   https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/actions"
