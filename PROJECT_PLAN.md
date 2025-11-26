# Plan de Projet - Application de Commande Snack/Restaurant

## 📋 Vue d'ensemble

**Objectif** : Application native pour passer commande dans un snack/restaurant via tablette/borne.

**Architecture** : À définir (MVC, MVP, ou MVVM)

**Stack** : React Native + Expo + TypeScript + NativeWind

---

## 🎯 Fonctionnalités (User Stories)

### US1 - Parcourir le menu
- Liste des produits disponibles
- Filtrage par catégories (burgers, boissons, desserts...)
- Affichage : nom, prix, image
- **Priorité** : 🔴 Haute

### US2 - Consulter un produit
- Page détaillée : description, prix, ingrédients, options
- Navigation retour vers la liste
- **Priorité** : 🔴 Haute

### US3 - Personnaliser sa commande
- Sélection taille, accompagnements, extras, variantes
- Prix dynamique selon options
- **Priorité** : 🟡 Moyenne

### US4 - Gérer son panier
- Ajouter/retirer produits
- Modifier quantités
- Total automatique
- Accessible à tout moment
- **Priorité** : 🔴 Haute

### US5 - Valider sa commande
- Écran récapitulatif
- Scan QR code (numéro de table) via caméra système
- **Priorité** : 🟡 Moyenne

### US6 - Paiement mocké
- Écran de paiement simulé
- Validation succès/échec
- **Priorité** : 🟡 Moyenne

### US7 - Confirmation
- Numéro de commande
- Message de remerciement
- Récapitulatif simplifié
- **Priorité** : 🟢 Basse

---

## 🔧 Contraintes techniques

### Architecture
- [ ] Choisir MVC, MVP ou MVVM
- [ ] Implémenter l'architecture choisie
- [ ] Documenter dans README

### Gestion des données
- [ ] Créer/sélectionner une API (Supabase, custom...)
- [ ] Modèle de données (produits, catégories, options)
- [ ] Service API pour charger le menu
- [ ] Gestion cache/offline si nécessaire

### Composants système natifs (minimum 2)
- [ ] Vibration / Haptic feedback
- [ ] Notifications locales
- [ ] Stockage local (AsyncStorage)
- [ ] Caméra (scan QR code)
- [ ] Géolocalisation (optionnel)
- [ ] Audio (optionnel)

### Cycle de vie & Erreurs
- [ ] Gestion rotation écran
- [ ] Gestion retour/back button
- [ ] Messages d'erreurs explicites
- [ ] Try/catch sur opérations critiques
- [ ] États de chargement

### Sécurité
- [ ] Gestion permissions (caméra, GPS si utilisé)
- [ ] Pas de secrets en clair
- [ ] Validation entrées utilisateur

### Qualité & Tests
- [ ] 2 tests unitaires minimum (total panier, validation)
- [ ] Structure code organisée
- [ ] Linting/formatting

### CI/CD
- [ ] Dépôt Git
- [ ] GitHub Actions / GitLab CI
- [ ] Pipeline : install → build → tests

---

## 👥 Répartition des tâches

### 👤 **Personne 1** (Backend/Data/State)

#### Phase 1 : Setup & Architecture
- [ ] Configuration API (Supabase ou custom)
- [ ] Modèle de données (types TypeScript)
- [ ] Service API pour récupérer le menu
- [ ] Architecture choisie (MVC/MVP/MVVM) - implémentation
- [ ] Store/Context pour état global (panier, commande)

#### Phase 2 : Gestion des données
- [ ] Service de gestion du panier (ajout, retrait, modification)
- [ ] Calcul automatique du total
- [ ] Validation des données (panier vide, etc.)
- [ ] Stockage local (AsyncStorage) pour sauvegarder panier
- [ ] Gestion cache/offline

#### Phase 3 : Logique métier
- [ ] Calcul prix dynamique (options, extras)
- [ ] Validation commande
- [ ] Génération numéro de commande
- [ ] Tests unitaires (total panier, validation commande)

#### Phase 4 : Composants système
- [ ] Notifications locales (confirmation commande)
- [ ] Stockage local (préférences utilisateur)

---

### 👤 **Personne 2** (Frontend/UI/UX)

#### Phase 1 : Setup UI
- [ ] Configuration NativeWind/Tailwind
- [ ] Composants de base (boutons, cards, inputs)
- [ ] Thème/design system
- [ ] Navigation (Expo Router)

#### Phase 2 : Écrans principaux
- [ ] **US1** : Écran liste menu avec filtres par catégorie
- [ ] **US2** : Écran détail produit
- [ ] **US3** : Interface personnalisation (options, extras)
- [ ] **US4** : Écran panier (liste, quantités, total)
- [ ] **US5** : Écran récapitulatif commande
- [ ] **US6** : Écran paiement mocké
- [ ] **US7** : Écran confirmation

#### Phase 3 : Composants système UI
- [ ] **Caméra** : Scan QR code (numéro de table)
- [ ] **Haptic feedback** : Vibrations sur interactions
- [ ] Gestion permissions (caméra)

#### Phase 4 : UX & Erreurs
- [ ] États de chargement (spinners, skeletons)
- [ ] Messages d'erreurs (panier vide, API down...)
- [ ] Gestion rotation écran
- [ ] Navigation cohérente (retour, breadcrumbs)

---

## 📅 Planning suggéré

### Semaine 1 : Setup & Fondations
- **Personne 1** : API, modèles, architecture, store
- **Personne 2** : Design system, navigation, composants de base

### Semaine 2 : Core Features
- **Personne 1** : Services panier, calculs, stockage
- **Personne 2** : Écrans US1, US2, US3, US4

### Semaine 3 : Features avancées
- **Personne 1** : Tests unitaires, validation
- **Personne 2** : Écrans US5, US6, US7, scan QR, haptic

### Semaine 4 : Polish & CI/CD
- **Personne 1** : CI/CD, documentation API
- **Personne 2** : UX polish, gestion erreurs, screenshots
- **Tous** : Tests finaux, README, préparation soutenance

---

## 🔄 Points de synchronisation

### Daily sync (15 min)
- État d'avancement
- Blocages
- API/Interface à définir ensemble

### Points de décision ensemble
- Choix architecture (MVC/MVP/MVVM)
- Design API (endpoints, format données)
- Design system (couleurs, typographie)
- Structure navigation

---

## 📝 Checklist finale

### Code
- [ ] Toutes les US implémentées
- [ ] Architecture documentée
- [ ] 2 tests unitaires minimum
- [ ] Gestion erreurs complète
- [ ] Permissions gérées
- [ ] Code propre et organisé

### Documentation
- [ ] README complet
- [ ] Instructions de lancement
- [ ] Captures d'écran
- [ ] Architecture expliquée

### CI/CD
- [ ] Dépôt Git configuré
- [ ] Pipeline fonctionnel
- [ ] Tests automatiques

### Livrables
- [ ] Code source
- [ ] APK / instructions de build
- [ ] README
- [ ] Présentation (10-15 min)

---

## 🚀 Commandes utiles

```bash
# Installation
pnpm install

# Développement
pnpm start
pnpm android
pnpm ios
pnpm web

# Tests
pnpm test

# Build
npx expo build:android
```

---

## 📌 Notes importantes

- **Communication** : Utiliser des issues GitHub pour tracker les tâches
- **Branches** : Créer des branches par feature (feature/US1-menu, feature/US4-panier...)
- **Code review** : Review mutuelle avant merge
- **API** : Documenter les endpoints dans un fichier séparé
- **Design** : S'accorder sur le design avant de coder les écrans

---

**Bon courage ! 🚀**

