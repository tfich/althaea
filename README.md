# Althaea

Althaea is an all-in-one Discord bot solution for online communities of all sizes. It operates as a Discord Bot as a service (DBaaS), allowing users to configure, customize, and deploy their bot within minutes using the managed web platform.

\*\* This project was developed during the **Summer of 2020**. Due to major changes in the [Discord API](https://discord.com/developers/docs/reference) I am unable to maintain a live site. Below you can click to find screenshots of the applications which may give you a better idea of the purpose / functionality of the application.

#### [Screenshots →](./_screenshots/index.md)

## Codebase

### Technologies

- TypeScript
- React
- NodeJS
- GraphQL
- Kubernetes
- Google Cloud Platform
- Cloud Build
- PostgreSQL
- Redis
- NextJS
- TailwindCSS
- DiscordJS
- [Apollo GraphQL Server + Client](https://www.apollographql.com/docs/)
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen)

### Folder Structure

```xml
environments/       # Shared .env files
kubernetes/         # Service and job configs
packages/
├── clients         # Shared clients
├── common          # Shared utils
scripts/
├── build.sh        # Cloud Build build script
├── deploy.sh       # Cloud Build deploy script
├── gen-secrets.sh  # Gen k8s secrets from .env template
services/
├── api             # API server
├── bot             # Discord bot
├── jobs            # Cron jobs
├── web             # Main web app
```

## Getting Started

### Installation

- Download and install **Postgres, Redis, NodeJS, TypeScript & Yarn** on your local machine.
- Postgres should be running on port `5432` and Redis on `6379`.
- Run `yarn` to install all dependencies.

### Create Database

Make sure you have a local database called `althaea-dev` running.

### Setup ENV

Run `cp environments/.env.example environments/.env.development` and fill in any missing values

## API

Base URl: `https://althaea.app/api` | `http://localhost:4000/api`

### Auth

Authentication with Althaea can be done in one of three ways:

1. Using a user's access token in the form of an `Authorization` header. A `refresh_token` cookie must also be
   provided when using this method.
2. Using a `X-Group-Token` header granted to an authenticated user or Discord bot instance.
3. Using a `X-API-Key` header provided to each group in the [developers settings](https://althaea.app/dashboard/settings/developers).

Accepted Headers:

| Header        | Description                                                   | Example            |
| ------------- | ------------------------------------------------------------- | ------------------ |
| Authorization | User authenticated Bearer token                               | Bearer XXXX        |
| X-Group-Token | Group specific authentication token                           | XXXX               |
| X-API-Key     | API key to access public rest API                             | XXXX               |
| X-Client-ID   | A valid client ID. Required unless a `X-API-Key` is provided. | BOT \| DASH \| WEB |

### GraphQL Playground

With the API server running locally, go to `http://localhost:4000/api/graphl`
and add the following http headers:

```json
{
  "use-generated-headers": true
}
```

## References

### Services Quick Links

- [Google Kubernetes Engine](https://console.cloud.google.com/kubernetes/list?project=althaea-aio)
- [Cloud Build](https://console.cloud.google.com/cloud-build?project=althaea-aio)
