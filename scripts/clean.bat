@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Limpando projeto Expo Android
echo ========================================

echo.
echo [1/8] Removendo node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo ✓ node_modules removido
) else (
    echo ✓ node_modules ja nao existe
)

echo.
echo [2/8] Removendo package-lock.json...
if exist package-lock.json (
    del /q package-lock.json
    echo ✓ package-lock.json removido
)

echo.
echo [3/8] Removendo caches do Metro...
if exist "%TEMP%\metro-cache" rmdir /s /q "%TEMP%\metro-cache" 2>nul
if exist "%TEMP%\expo-cache" rmdir /s /q "%TEMP%\expo-cache" 2>nul
if exist "%TEMP%\haste-map-react-native-packager-*" rmdir /s /q "%TEMP%\haste-map-react-native-packager-*" 2>nul
echo ✓ Caches removidos

echo.
echo [4/8] Limpando cache do npm...
call npm cache clean --force >nul 2>&1
echo ✓ Cache npm limpo

echo.
echo [5/8] Removendo pasta .expo...
if exist .expo (
    rmdir /s /q .expo
    echo ✓ Pasta .expo removida
)

echo.
echo [6/8] Instalando dependencias com npm install...
call npm install
if !errorlevel! neq 0 (
    echo ❌ Erro no npm install
    pause
    exit /b 1
)
echo ✓ npm install concluido

echo.
echo [7/8] Ajustando versoes com expo install...
call npx expo install
if !errorlevel! neq 0 (
    echo ❌ Erro no expo install
    pause
    exit /b 1
)
echo ✓ expo install concluido

echo.
echo [8/8] Limpando cache do Metro...
echo Iniciando expo start -c (pressione Ctrl+C apos iniciar)
call npx expo start -c

echo.
echo ========================================
echo ✓ Processo concluido com sucesso!
echo.
echo ⚠ IMPORTANTE:
echo 1. Aguarde o Metro bundler iniciar
echo 2. Pressione Ctrl+C para parar
echo 3. Em outro terminal execute: npx expo run:android
echo ========================================
pause