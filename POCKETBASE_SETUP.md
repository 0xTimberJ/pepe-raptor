# Configuration PocketBase

## 📋 Étapes de configuration

### 1. Mettre à jour l'URL PocketBase

Édite le fichier `lib/pocketbase.ts` et remplace l'URL :

```typescript
const POCKETBASE_URL = "https://ton-url-pocketbase.com";
```

### 2. Créer la collection "burgers" dans PocketBase

Dans l'interface admin de PocketBase :

1. Crée une nouvelle collection nommée `burgers`
2. Ajoute les champs suivants :
   - `name` (Text, requis)
   - `price` (Number, requis)
   - `description` (Text, optionnel)
   - `image` (URL, optionnel) - ou utilise un champ File pour uploader des images

### 3. Ajouter des données de test

Dans PocketBase, ajoute quelques burgers de test :

- Nom : "Cheeseburger"
- Prix : 8.50
- Description : "Burger avec fromage"

### 4. Configurer les permissions ⚠️ IMPORTANT

Dans les paramètres de la collection `burgers` :

1. Va dans l'onglet **"API Rules"** (ou **"Permissions"**)
2. Pour la règle **"List/Search"** :
   - Active-la pour **"Guest"** (utilisateurs anonymes)
   - Ou ajoute cette règle : `@request.method = "GET"`

**Sans cette configuration, tu auras une erreur 403 "Only superusers can perform this action"**

## 🚀 Test

Lance l'app :

```bash
pnpm start
```

Tu devrais voir la liste des burgers s'afficher !

## 📝 Structure actuelle

- `lib/pocketbase.ts` : Configuration PocketBase
- `services/burgers.ts` : Service pour récupérer les burgers
- `app/(tabs)/index.tsx` : Écran qui affiche la liste

## 🔄 Prochaines étapes

- [ ] Ajouter les catégories
- [ ] Filtrer par catégorie
- [ ] Page détail produit
- [ ] Gestion du panier
