<p align="center">
<img src=".github/piGif.gif" height="400">
</p>

# SportsMatch

O foco do projeto é criar um aplicativo que reúne entusiastas de esportes. Este aplicativo permite aos usuários explorar uma variedade de esportes, visualizar eventos relacionados e marcar presença. Além disso, eles podem criar seus próprios agendamentos esportivos, promovendo a atividade física, a socialização e a organização de eventos esportivos.

## Stacks

- React Native
- Typescript
- Expo
- React Navigation
- Styled Components
- Native Base
- React Hook Form
- Yup
- Firebase
- Lottie

# Para rodar o projeto

## Clonar o projeto e entre na pasta

```
  git clone branch_url
```

```
   cd pi-ftec
```

## Instalar as dependências

```
  npm install ou yarn install
```

## **Criar um projeto no console do [Firebase](https://console.firebase.google.com/)**
1. Criar um app android no Firebase
  1.1 Adicionar autenticação com Google
2. Criar um banco de dados com Firestore Database
  2.2 Alterar regra de negócio do banco, senão não vai conseguir criar agendamentos
```
   allow read, write;
```

## Criação das chaves SHA1 e SHA256

Entrar na pasta android/app
```
   cd android/app
```

Criar chaves
```
   keytool -genkeypair -v -storetype PKCS12 -keystore firebase.keystore -alias fb-alias -keyalg RSA -keysize 2048 -validity 10000
```

Atualizar o build.gradle na pasta android/app
```
   signingConfigs {
        debug {
            storeFile file('firebase.keystore')
            storePassword 'senha_cadastrada_na_criação_das_chaves'
            keyAlias 'fb-alias'
            keyPassword 'senha_cadastrada_na_criação_das_chaves'
        }
    }
```

Copiar as chaves SHA1 e SHA256
```
  keytool -keystore firebase.keystore -list -v
```

## **Adicionar chaves na configuração do projeto android no console do [Firebase](https://console.firebase.google.com/)**

## Baixar o arquivo google-services.json no console do [Firebase](https://console.firebase.google.com/)

Coloque o arquivo na pasta raiz do projeto e na pasta android/app

## Entre no arquivo e copie o client_id
```
  "oauth_client": [
        ...
        {
          "client_id": "seu_client_id",
          "client_type": 3
        }
      ],
```

## Renomeia o arquivo .env_example para .env e cola o seu client_id
```
  WEB_CLIENT_ID=seu_client_id
```

## rodar o projeto
```
  yarn android
```

## Feedback ou sugestões

[![Linkedin Badge](https://img.shields.io/badge/-Adalberto%20Lauchzer%20Junior-6633cc?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/lauchzerjr%C3%A7/)](https://www.linkedin.com/in/lauchzerjr/)
