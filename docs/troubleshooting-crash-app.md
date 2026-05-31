# Troubleshooting - Crash Android causado por incompatibilidade do `expo-font`

## Objetivo

Documentar o processo de identificação, análise e correção de um crash Android causado por incompatibilidade de versões do pacote `expo-font` em um projeto Expo/React Native.

---

# Sintoma

A aplicação compilava normalmente, porém encerrava imediatamente ao ser aberta no Android.

Durante a execução foi identificado um erro fatal no Logcat:

```text
FATAL EXCEPTION: pool-2-thread-1

java.lang.NoSuchMethodError:
No static method getDirectConverter(Ljava/lang/Class;)
Lexpo/modules/kotlin/types/JSTypeConverter;
```

O stack trace apontava para:

```text
expo.modules.font.FontLoaderModule
```

Trecho relevante:

```text
at expo.modules.font.FontLoaderModule.definition(FontLoaderModule.kt:98)
at expo.modules.kotlin.ModuleHolder.<init>(ModuleHolder.kt:22)
at expo.modules.kotlin.ModuleRegistry.register(ModuleRegistry.kt:29)
```

---

# Como localizar o erro

## 1. Executar a aplicação

Inicie a aplicação normalmente:

```bash
npx expo run:android
```

ou

```bash
npx expo start
```

---

## 2. Abrir os logs do Android

Utilize o Logcat através do Android Studio ou pelo terminal:

```bash
adb logcat
```

Para filtrar apenas erros:

```bash
adb logcat *:E
```

---

## 3. Identificar o primeiro erro fatal

Procure por:

```text
FATAL EXCEPTION
```

ou

```text
AndroidRuntime
```

No caso analisado:

```text
java.lang.NoSuchMethodError
```

Esse tipo de erro normalmente indica:

* Incompatibilidade entre bibliotecas
* Dependências duplicadas
* Dependências compiladas para versões diferentes

---

# Investigação

## Executar o Expo Doctor

Foi utilizado o comando:

```bash
npx expo-doctor
```

Resultado:

```text
3 checks failed
```

---

## Problema 1 - Dependência obrigatória ausente

```text
Missing peer dependency: expo-font
Required by: @expo/vector-icons
```

O pacote `@expo/vector-icons` depende do `expo-font`.

---

## Problema 2 - Dependências duplicadas

O Expo Doctor identificou duas versões instaladas do mesmo módulo nativo:

```text
expo-font@56.0.5
expo-font@55.0.8
```

Estrutura encontrada:

```text
node_modules/
 ├── expo-font@56.0.5
 └── expo/
      └── node_modules/
           └── expo-font@55.0.8
```

---

## Problema 3 - Pacotes fora da versão esperada

```text
react-native           expected 0.83.6
found                  0.83.2

react-native-worklets  expected 0.7.4
found                  0.7.1
```

---

# Causa Raiz

O projeto possuía múltiplas versões do módulo nativo `expo-font`.

Durante a inicialização do Android:

```text
expo-font
↓
expo-modules-core
↓
expo-kotlin
```

uma versão tentava acessar métodos que não existiam na outra.

Resultado:

```text
java.lang.NoSuchMethodError
```

O Android encerrava a aplicação imediatamente.

---

# Correção

## 1. Remover a instalação manual do expo-font

```bash
npm uninstall expo-font
```

---

## 2. Instalar a versão correta

Sempre utilizar:

```bash
npx expo install expo-font
```

O comando instala automaticamente a versão compatível com a SDK do Expo utilizada pelo projeto.

---

## 3. Atualizar dependências incompatíveis

Executar:

```bash
npx expo install react-native react-native-worklets
```

---

## 4. Limpar dependências

Windows:

```bash
rd /s /q node_modules
del package-lock.json
```

Linux/macOS:

```bash
rm -rf node_modules
rm package-lock.json
```

---

## 5. Reinstalar dependências

```bash
npm install
```

---

## 6. Limpar arquivos nativos

Se estiver utilizando Prebuild:

```bash
npx expo prebuild --clean
```

---

## 7. Limpar cache do Metro

```bash
npx expo start --clear
```

---

## 8. Recompilar a aplicação

```bash
npx expo run:android
```

---

# Como evitar o problema

## Sempre instalar pacotes Expo usando:

```bash
npx expo install <pacote>
```

Exemplo:

```bash
npx expo install expo-font
npx expo install expo-image
npx expo install expo-router
```

Evite:

```bash
npm install expo-font
```

ou

```bash
yarn add expo-font
```

Pois podem instalar versões incompatíveis com a SDK atual.

---

# Comandos úteis para diagnóstico

## Verificar inconsistências

```bash
npx expo-doctor
```

---

## Verificar versões esperadas

```bash
npx expo install --check
```

---

## Corrigir automaticamente

```bash
npx expo install --fix
```

---

## Verificar dependências duplicadas

```bash
npm ls expo-font
```

ou

```bash
npm ls
```

---

# Checklist de Troubleshooting Expo

* [ ] Executar `adb logcat`
* [ ] Localizar `FATAL EXCEPTION`
* [ ] Identificar módulo responsável
* [ ] Executar `npx expo-doctor`
* [ ] Verificar dependências ausentes
* [ ] Verificar dependências duplicadas
* [ ] Atualizar pacotes incompatíveis
* [ ] Limpar `node_modules`
* [ ] Executar `npx expo install --fix`
* [ ] Executar `npx expo prebuild --clean`
* [ ] Recompilar o aplicativo

---

# Conclusão

O crash foi causado por uma incompatibilidade entre versões do módulo nativo `expo-font`. A análise do Logcat permitiu identificar o módulo responsável e o `expo-doctor` confirmou a existência de dependências duplicadas. Após alinhar as versões dos pacotes Expo, remover instalações conflitantes e reconstruir o projeto, a aplicação voltou a iniciar normalmente.
