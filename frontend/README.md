# Frontend PALOMA ERP

Interface utilisateur pour l'application PALOMA ERP d'A&C Process, permettant la gestion et la visualisation des plans d'incinérateurs.

## 🚀 Fonctionnalités

### Authentification
- Page de connexion sécurisée
- Gestion des tokens JWT
- Protection des routes

### Dashboard
- KPIs en temps réel
- Activité récente
- Alertes système
- Navigation intuitive

### Gestion des Plans
- Liste des plans d'incinérateurs
- Filtres par client, type et statut
- Création et modification de plans
- Visualisation détaillée avec calques

### Visualisation de Plans
- Interface de visualisation interactive
- Gestion des calques (affichage/masquage)
- Informations sur les matériaux
- Suivi des interventions
- Outils de zoom et navigation

### Exports
- Génération d'exports PDF/CSV/Excel
- Configuration des exports
- Historique des exports
- Téléchargement des fichiers

## 🛠️ Technologies

- **Vue.js 3** - Framework frontend
- **Vue Router** - Gestion des routes
- **Tailwind CSS** - Framework CSS
- **JavaScript ES6+** - Langage de programmation

## 📁 Structure du projet

```
src/
├── components/
│   └── PalomaHeader.vue          # Header réutilisable
├── services/
│   └── api.js                    # Service API centralisé
├── views/
│   ├── PalomaLogin.vue           # Page de connexion
│   ├── PalomaDashboard.vue       # Dashboard principal
│   ├── PalomaPlans.vue           # Liste des plans
│   ├── PalomaPlanViewer.vue      # Visualiseur de plan
│   └── PalomaExports.vue         # Gestion des exports
├── router/
│   └── index.js                  # Configuration des routes
└── main.js                       # Point d'entrée
```

## 🚀 Installation

### Prérequis
- Node.js 16+
- npm ou yarn
- Backend PALOMA en cours d'exécution

### Installation des dépendances
```bash
cd frontend
npm install
```

### Configuration
Créer un fichier `.env` à la racine du projet frontend :
```env
VITE_API_URL=http://localhost:3333/api
```

### Démarrage en développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production
```bash
npm run build
```

## 🔧 Configuration

### Variables d'environnement
- `VITE_API_URL` : URL de l'API backend (défaut: http://localhost:3333/api)

### Authentification
L'application utilise JWT pour l'authentification :
- Les tokens sont stockés dans le localStorage
- Expiration automatique après 24h
- Redirection automatique vers la page de connexion

## 📱 Pages et fonctionnalités

### Page de connexion (`/paloma/login`)
- Formulaire de connexion
- Validation des champs
- Gestion des erreurs
- Redirection automatique

### Dashboard (`/paloma/dashboard`)
- **KPIs** : Clients actifs, plans actifs, interventions du mois, temps de réponse
- **Activité récente** : Timeline des dernières actions
- **Alertes** : Notifications importantes

### Plans (`/paloma/plans`)
- **Liste** : Affichage en grille avec filtres
- **Filtres** : Client, type, statut, recherche
- **Actions** : Créer, modifier, supprimer
- **Navigation** : Vers le visualiseur de plan

### Visualiseur de plan (`/paloma/plans/:id`)
- **Informations** : Métadonnées du plan
- **Calques** : Gestion de l'affichage
- **Matériaux** : Liste des matériaux associés
- **Interventions** : Suivi des interventions
- **Outils** : Zoom, export, modification

### Exports (`/paloma/exports`)
- **Liste** : Historique des exports
- **Création** : Nouvel export avec configuration
- **Téléchargement** : Accès aux fichiers générés
- **Statuts** : Suivi de l'état des exports

## 🔌 API

Le frontend communique avec le backend via le service `api.js` qui centralise tous les appels API :

### Endpoints principaux
- `POST /auth/login` - Connexion
- `GET /dashboard` - Données du dashboard
- `GET /plans` - Liste des plans
- `GET /plans/:id` - Détails d'un plan
- `GET /exports` - Liste des exports
- `POST /exports` - Créer un export

### Gestion des erreurs
- Interception automatique des erreurs 401 (redirection)
- Affichage des messages d'erreur
- Retry automatique pour les erreurs réseau

## 🎨 Design System

### Couleurs
- **Primary** : Bleu (#3B82F6)
- **Success** : Vert (#10B981)
- **Warning** : Jaune (#F59E0B)
- **Error** : Rouge (#EF4444)
- **Gray** : Gris (#6B7280)

### Composants
- **Cards** : Conteneurs avec ombre et coins arrondis
- **Buttons** : Boutons avec états hover et focus
- **Forms** : Formulaires avec validation
- **Modals** : Fenêtres modales pour les actions importantes

## 🔒 Sécurité

- **Authentification** : JWT avec expiration
- **Routes protégées** : Navigation guard sur les pages privées
- **Validation** : Validation côté client et serveur
- **CORS** : Configuration appropriée pour les appels API

## 🧪 Tests

```bash
# Tests unitaires
npm run test:unit

# Tests E2E
npm run test:e2e
```

## 📦 Déploiement

### Build de production
```bash
npm run build
```

### Variables d'environnement de production
```env
VITE_API_URL=https://api.paloma.ac-process.com
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est propriétaire d'A&C Process.

## 📞 Support

Pour toute question ou problème :
- Email : contact@ac-process.com
- Documentation : [Lien vers la documentation]
