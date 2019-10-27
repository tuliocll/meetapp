[![Language](https://img.shields.io/badge/language-ES%206-orange.svg)](https://github.com/lukehoban/es6features#readme)
[![Platforms](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](http://facebook.github.io/react-native/docs/getting-started.html)

# Meetapp

##### App agregador de eventos para desenvolvedores chamado Meetapp (um acrônimo à Meetup + App).

<img src="https://github.com/tuliocll/meetapp/blob/master/img/mobile-preview.gif" alt="Mobile Preview" width="320px"></img>

<img src="https://github.com/tuliocll/meetapp/blob/master/img/web-preview.gif" alt="Web Preview" width="320px"></img>

## Criando os containers:

**Container do postgres:**

```bash
$ docker run --name database_meetapp -e POSTGRES_PASSWORD = docker -e POSTGRES_DB = database_meetapp -p 5432: 5432 -d postgres
```

**Container do Redis:**

```bash
docker run --name redismeetapp -p 6379: 6379 -d -t redis: alpino
```

## Instalar - Backend

**Clonando o repositorio:**

```bash
git clone https://github.com/tuliocll/meetapp
```

Navegue até a pasta do backend:

```bash
cd meetapp/backend
```

**Instalando as dependencias:**

```bash
yarn
```

**Criar .env:**

Faça uma copia do .env-example e edite com suas configurações:

```bash
cp .env-example .env
```

**Gerar secret key do adonis:**

```bash
adonis key:generate
```

**Executar as migrations:**

```bash
adonis migration:run
```

**(Opcional) Executar seeds:**

```bash
adonis db:seed:all
```

**Executar Backend (DEV)**

```bash
adonis serve --dev
```

e para fila do redis:

```bash
adonis kue:listen
```

**Executar Backend (PROD)**

use o pm2 para iniciar o serviço

```bash
pm2 start server.js
```

e o [supervisord](http://supervisord.org/) para a fila,
basta copiar o arquivo supervisor-meetapp.conf(edite o arquivo para colocar o caminho do projeto):

```bash
/etc/supervisor/conf.d/<copiar aqui>
```

Em seguida executar o reread e o update:

```bash
supervisorctl reread && supervisorctl update
```

E iniciar o serviço:

```bash
supervisorctl start meetapp-queue:*
```

## Instalar - Frontend

Navegue até a pasta do frontend:

```bash
cd meetapp/frontend
```

**Instalando as dependencias:**

```bash
yarn
```

**Criar .env:**

Faça uma copia do .env-example e edite com suas configurações:

```bash
cp .env-example .env
```

**Iniciar Frontend:**

```bash
yarn start
```

## Instalar - Mobile

Navegue até a pasta do mobile:

```bash
cd meetapp/mobile
```

**Instalando as dependencias:**

```bash
yarn
```

**Criar .env:**

Faça uma copia do .env-example e edite com suas configurações:

```bash
cp .env-example .env
```

**Iniciar Mobile (testando apenas no Android):**

Rode o metro-bundle:

```bash
yarn start
```

inicie a aplicação no android:

```bash
react-native run-android
```

## Notas

A aplicação foi testada apenas no Android.

## License

GNU General Public License v3.0
