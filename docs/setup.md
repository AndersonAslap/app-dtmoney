# criando e configurando app

> comando para criar projeto 

```bash
npx create-expo-app@latest app-dtmoney --template blank-typescript
```

> comando para rodar o app no android

```bash
npx expo run:android
```

> comando para instalar o NativeWind (É com ele que iremos estilizar nosso projeto)

- link: https://www.nativewind.dev/docs

```bash
npm install nativewind react-native-reanimated react-native-safe-area-context
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo
```

> comando para o setup do tailwind css

```bash
npx tailwindcss init
```

> criar os arquivos e adicionar conteúdo de configuração nesses arquivos
- global.css
- babel.config.js
- metro.config.js
- nativewind-env.d.ts

> comando para instalar o babel-plugin-module-resolver

```bash
npm i babel-plugin-module-resolver -D
```

- Proximo passo ir no tsconfig.json fazer isso no path.`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- Proximo passo ir no babel.condif.js e adicionar isso.

```js
{
  plugins: [
        [
            "module-resolver", 
            {
                root: ["."],
                alias: {
                    "@": "."
                }
            }
        ]
    ]
}
```

# configurando rotas

- Utilizar o react navigation

comandos

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

- instalar o stack navigation
comandos

```bash
npm install @react-navigation/stack
npx expo install react-native-gesture-handler @react-native-masked-view/masked-view
```

- instalar o edge-to-edge

- essa lib vai fazer com que nosso aplicativo utilize 
100% da nossa tela.

```bash
npx expo install react-native-edge-to-edge
```