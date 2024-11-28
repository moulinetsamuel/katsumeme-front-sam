![Katsumeme Banner](./public/Logoname.png)

# Katsumeme Frontend 🖼️🎉

Plateforme de partage de memes développée comme projet de fin de formation.  
**Créez, partagez et interagissez avec des memes dans une interface moderne et accessible !**

## 🛠️ Technologies Utilisées

- React 18 avec TypeScript
- Vite pour le build et le développement
- Bootstrap 5.3 pour l'interface utilisateur
- Zustand pour la gestion d'état
- Axios pour les requêtes API
- React Router pour la navigation
- React Dropzone pour l'upload de fichiers

## ✨ Fonctionnalités Principales

- 👤 Authentification (inscription/connexion)
- 📤 Upload et partage de memes
- ❤️ Système de likes et commentaires
- 🔖 Gestion des bookmarks
- 📱 Interface responsive
- 🔍 Recherche et filtrage de memes
- 👤 Gestion de profil utilisateur

## 📋 Prérequis

- Node.js 18+
- pnpm 9.x
- Backend Katsumeme en cours d'exécution

## 🚀 Installation

1. Clonez le repository :

   ```bash
   git clone https://github.com/moulinetsamuel/katsumeme-front-sam.git
   cd katsumeme-front-sam
   ```

2. Installez les dépendances :

   ```bash
   pnpm install
   ```

3. Configuration :

- Copiez le fichier `.env.example` vers `.env`
- Modifiez les variables d'environnement selon votre configuration :

  ```env
  VITE_API_URL=votre_url_api
  ```

4. Démarrez l'application :

   ```bash
   pnpm run dev
   ```

## 📝 Scripts Disponibles

- `pnpm run dev` : Mode développement
- `pnpm run build` : Build production
- `pnpm run preview` : Prévisualisation production
- `pnpm run lint` : Vérification ESLint
- `pnpm run lint:fix` : Correction automatique ESLint

## 📁 Structure du Projet

```
src/
├── components/ # Composants React
├── pages/ # Pages de l'application
├── store/ # Stores Zustand
├── services/ # Services API
├── types/ # Types TypeScript
└── assets/ # Ressources statiques
```

## 🔗 Liens Utiles

- [Backend Repository](https://github.com/moulinetsamuel/katsumeme-back-sam)

## 🌐 Démo en Ligne

➡️ **[Voir la démo en ligne](http://i4w0scw4sw4wgw44osk04ww0.82.65.221.75.sslip.io/)** et découvrez les fonctionnalités de Katsumeme !

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
