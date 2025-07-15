# Vitrine Client Backend

Backend API pour l'application Vitrine Client, construit avec AdonisJS.

## Variables d'environnement

Créez un fichier `.env` à la racine du backend avec les variables suivantes :

```env
# Application
NODE_ENV=development
PORT=3333
APP_KEY=your-app-key-here
HOST=0.0.0.0
LOG_LEVEL=info

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=vitrine_client

# Session
SESSION_DRIVER=cookie

# Mail (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Railway (optional - for deployment)
RAILWAY_STATIC_URL=
RAILWAY_PUBLIC_DOMAIN=
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Tests

```bash
npm test
```

## Déploiement sur Railway

1. Connectez votre repository GitHub à Railway
2. Définissez le répertoire racine sur `backend`
3. Ajoutez une base de données MySQL
4. Configurez les variables d'environnement dans Railway
5. Déployez !

## Routes principales

- `GET /` - Page d'accueil de l'API
- `GET /health` - Healthcheck avec test de base de données
- `POST /api/register` - Inscription utilisateur
- `POST /api/login` - Connexion utilisateur
- `POST /api/logout` - Déconnexion utilisateur
- `GET /api/me` - Informations utilisateur connecté 