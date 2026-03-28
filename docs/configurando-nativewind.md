# 🎨 Setup completo do NativeWind (Tailwind no React Native com Expo)

Este guia descreve passo a passo como configurar o **NativeWind**, permitindo usar **TailwindCSS no React Native** de forma performática e escalável.

---

## 📦 1. Instalação das dependências

O NativeWind é responsável por trazer a experiência do Tailwind para o React Native.

### ▶️ Instale as dependências principais:

```bash
npm install nativewind react-native-reanimated react-native-safe-area-context
```

### ▶️ Instale as dependências de desenvolvimento:

```bash
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo
```

---

## ⚙️ 2. Inicialização do Tailwind

Crie o arquivo de configuração do Tailwind:

```bash
npx tailwindcss init
```

Isso irá gerar o arquivo:

```
tailwind.config.js
```

---

## 🧩 3. Configuração do `tailwind.config.js`

Edite o arquivo para integrar corretamente com o NativeWind:

```js
const { colors } = require('./src/shared/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"], 
  // 🔥 ESSENCIAL: informa ao Tailwind onde procurar classes
  // Sem isso, os estilos não serão gerados

  presets: [require("nativewind/preset")], 
  // 🔥 ESSENCIAL: adiciona compatibilidade com React Native

  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },

      fontSize: {
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },

      height: {
        button: 57,
      },

      colors, // 🔥 seu design system centralizado
    },
  },

  plugins: [],
}
```

### 📌 Explicações importantes:

* **`content`**
  Define onde o Tailwind deve procurar classes (`className`).
  Sem isso → **nenhum estilo será aplicado**.

* **`presets: [nativewind/preset]`**
  Adapta o Tailwind para funcionar com o React Native.

* **`extend`**
  Permite customizar:

  * tipografia
  * cores
  * espaçamentos
  * tokens de design

---

## 🎨 4. Criar o arquivo global de estilos

Crie o arquivo:

```
src/styles/global.css
```

### Conteúdo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 📌 Por quê isso é necessário?

Esse arquivo injeta:

* estilos base
* utilitários do Tailwind
* componentes padrão

---

## ⚙️ 5. Configuração do Babel

Crie (ou edite) o arquivo:

```
babel.config.js
```

### Conteúdo:

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

### 📌 Explicação:

* Permite usar `className` no React Native
* Faz o binding entre Tailwind e os componentes nativos
* Essencial para o NativeWind funcionar corretamente

---

## 🚀 6. Configuração do Metro (bundler do Expo)

Crie ou edite:

```
metro.config.js
```

### Conteúdo:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: './src/styles/global.css', // 🔥 caminho do CSS global
});
```

### 📌 Explicação:

* Integra o Tailwind ao bundler do Expo
* Permite interpretar corretamente o CSS dentro do ambiente React Native

---

## 🧠 7. Importar o CSS global na aplicação

No seu arquivo principal (`App.tsx` ou `index.tsx`):

```tsx
import "./src/styles/global.css";

export default function App() {
  return (
    // Seu app aqui
  );
}
```

---

## 🟦 8. Suporte ao TypeScript

Crie um arquivo na raiz do projeto:

```
nativewind-env.d.ts
```

### Conteúdo:

```ts
/// <reference types="nativewind/types" />
```

### 📌 Por quê isso é necessário?

* Adiciona tipagem para `className`
* Evita erros no TypeScript
* Habilita autocomplete

---

## ✅ 9. Testando se está funcionando

Crie um componente simples:

```tsx
import { Text, View } from "react-native";

export function Test() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-xl font-bold">
        NativeWind funcionando 🚀
      </Text>
    </View>
  );
}
```

Se aparecer com estilos → ✅ tudo certo!

---

## ⚠️ Problemas comuns

### ❌ Estilos não aparecem

* Verifique `content` no `tailwind.config.js`
* Reinicie o bundler (`npm start -- --reset-cache`)

### ❌ className não funciona

* Verifique o `babel.config.js`
* Verifique se `nativewind/babel` está presente

### ❌ CSS não carregado

* Confirme o caminho no `metro.config.js`

---

## 🏗️ Boas práticas

* Centralize cores em `/shared/colors`
* Crie tokens de design (spacing, radius, etc.)
* Evite inline styles → use `className`
* Utilize componentes reutilizáveis

---

## 🚀 Resultado final

Após essa configuração você terá:

* Tailwind funcionando no React Native
* Código mais limpo e escalável
* Design system centralizado
* Alta produtividade no desenvolvimento