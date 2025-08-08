# 🎯 Gestionnaire de Tâches Intelligent

Une application moderne de gestion de tâches avec interface drag & drop, construite avec React, TypeScript et Tailwind CSS.

## 📱 Disponibilité Mobile

### ✅ Application Web Progressive (PWA)
L'application est maintenant configurée comme une **Progressive Web App (PWA)**, ce qui signifie :

- **Installation sur Android** : Vous pouvez installer l'application sur votre écran d'accueil
- **Mode hors ligne** : L'application fonctionne même sans connexion internet
- **Interface native** : L'apparence et le comportement sont similaires à une application native
- **Notifications push** : Support des notifications (à implémenter)

### 📲 Comment installer sur Android

1. **Ouvrez l'application** dans Chrome sur votre Android
2. **Appuyez sur le menu** (3 points) en haut à droite
3. **Sélectionnez "Ajouter à l'écran d'accueil"**
4. **Confirmez l'installation**
5. **L'application apparaîtra** sur votre écran d'accueil comme une app native

### 🌐 Accès via navigateur
- **URL** : `http://localhost:3000` (développement)
- **Compatible** : Chrome, Firefox, Safari, Edge
- **Responsive** : Interface adaptée à tous les écrans

## ✨ Fonctionnalités Principales

### 🎨 Interface et UX
- **Interface Kanban** : Organisez vos tâches en colonnes (À faire, En cours, Terminé)
- **Drag & Drop** : Déplacez facilement les tâches entre les statuts
- **Mode sombre/clair** : Basculez entre les thèmes selon vos préférences
- **Design responsive** : Interface adaptée à tous les écrans
- **Animations fluides** : Transitions et effets visuels modernes

### 📋 Gestion des Tâches
- **Gestion des priorités** : Priorités élevée, moyenne et faible avec codes couleur
- **Dates d'échéance** : Définissez des échéances avec rappels visuels
- **Tags et projets** : Organisez vos tâches avec des tags et projets
- **Sous-tâches** : Décomposez vos tâches en étapes plus petites
- **Temps estimé/réel** : Suivez le temps passé sur vos tâches
- **Attributions** : Assignez des tâches à des membres d'équipe
- **Tâches récurrentes** : Créez des tâches qui se répètent automatiquement

### 🔍 Recherche et Filtrage
- **Recherche en temps réel** : Trouvez rapidement vos tâches
- **Filtres avancés** : Filtrez par statut, priorité, date, tags, etc.
- **Tri personnalisable** : Triez par date, priorité, titre, etc.
- **Vues multiples** : Kanban, liste, et calendrier (à venir)

### 📊 Statistiques et Suivi
- **Statistiques détaillées** : Suivez votre productivité
- **Graphiques de progression** : Visualisez vos performances
- **Rapports hebdomadaires** : Analysez vos tendances
- **Score de productivité** : Mesurez votre efficacité

### 🔔 Notifications
- **Système de notifications** : Recevez des rappels pour vos tâches
- **Notifications en temps réel** : Alertes pour les échéances
- **Personnalisation** : Configurez vos préférences de notification
- **Historique** : Consultez toutes vos notifications

### ⚙️ Paramètres et Personnalisation
- **Paramètres avancés** : Personnalisez l'interface selon vos besoins
- **Raccourcis clavier** : Navigation rapide avec le clavier
- **Export/Import** : Sauvegardez et restaurez vos données
- **Thèmes personnalisables** : Adaptez l'apparence à vos goûts

### 💾 Sauvegarde et Synchronisation
- **Sauvegarde locale** : Vos données sont sauvegardées automatiquement
- **Export des données** : Sauvegardez vos tâches en JSON
- **Import des données** : Restaurez vos données depuis un fichier
- **Mode hors ligne** : Utilisez l'application sans connexion

## 🚀 Nouvelles Fonctionnalités Ajoutées

### 🎨 Interface Améliorée
- **Mode sombre/clair** avec basculement automatique
- **Notifications en temps réel** avec compteur
- **Filtres avancés** avec options multiples
- **Paramètres utilisateur** personnalisables

### 🔧 Fonctionnalités Techniques
- **Raccourcis clavier** (Ctrl+N, Ctrl+F, Escape, etc.)
- **Système de notifications** complet
- **Filtres avancés** avec sauvegarde
- **Export/Import** des paramètres
- **Mode hors ligne** avec cache local

### 📈 Statistiques Avancées
- **Graphiques de progression** détaillés
- **Analyse par catégorie** et projet
- **Métriques de productivité** en temps réel
- **Rapports personnalisables**

### 🔔 Système de Notifications
- **Notifications push** pour les échéances
- **Rappels personnalisables** (5min à 24h avant)
- **Historique des notifications** avec marquage lu/non-lu
- **Sons de notification** optionnels

### ⚙️ Paramètres Utilisateur
- **Thème** : Mode clair/sombre/auto
- **Notifications** : Personnalisation complète
- **Affichage** : Vue par défaut, tri, groupement
- **Raccourcis** : Personnalisation des touches
- **Export/Import** : Sauvegarde des préférences

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd gestionnaire-taches
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en mode développement**
```bash
npm start
```

4. **Ouvrir votre navigateur**
L'application sera disponible à l'adresse : `http://localhost:3000`

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **React Beautiful DnD** - Drag & Drop
- **Lucide React** - Icônes modernes
- **React Hot Toast** - Notifications
- **date-fns** - Manipulation des dates

### Architecture
- **Hooks personnalisés** pour la logique métier
- **Composants modulaires** et réutilisables
- **LocalStorage** pour la persistance des données
- **TypeScript** pour la sécurité des types

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── TaskCard.tsx    # Carte de tâche individuelle
│   ├── TaskForm.tsx    # Formulaire d'édition/création
│   └── TaskStats.tsx   # Composant de statistiques
├── hooks/              # Hooks personnalisés
│   └── useTasks.ts     # Logique de gestion des tâches
├── types/              # Définitions TypeScript
│   └── index.ts        # Interfaces et types
├── App.tsx             # Composant principal
├── index.tsx           # Point d'entrée
└── index.css           # Styles globaux
```

## 🎮 Utilisation

### Créer une Tâche
1. Cliquez sur le bouton **"Nouvelle tâche"**
2. Remplissez les champs requis :
   - **Titre** (obligatoire)
   - **Description** (optionnel)
   - **Priorité** (Faible/Moyenne/Élevée)
   - **Date d'échéance** (optionnel)
   - **Tags** (optionnel)
   - **Projet** (optionnel)
3. Cliquez sur **"Créer"**

### Gérer les Tâches
- **Modifier** : Cliquez sur l'icône crayon
- **Supprimer** : Cliquez sur l'icône poubelle
- **Changer le statut** : Utilisez les boutons ou le drag & drop

### Vue Kanban
- **Glissez-déposez** les tâches entre les colonnes
- **Statuts** : À faire → En cours → Terminé
- **Compteurs** en temps réel par colonne

### Recherche et Filtrage
- **Barre de recherche** : Recherche globale
- **Filtre par statut** : Tous/À faire/En cours/Terminé
- **Mode d'affichage** : Kanban ou Liste

## 📊 Statistiques

L'application calcule automatiquement :
- **Total des tâches**
- **Tâches terminées**
- **Tâches en cours**
- **Tâches en retard**
- **Taux de complétion**
- **Résumé hebdomadaire**

## 🔧 Scripts Disponibles

```bash
# Développement
npm start

# Build de production
npm run build

# Tests
npm test

# Éjection (non recommandé)
npm run eject
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.js` :
- **Primary** : Bleu (#3b82f6)
- **Success** : Vert (#22c55e)
- **Warning** : Orange (#f59e0b)
- **Danger** : Rouge (#ef4444)

### Styles
Les styles personnalisés sont dans `src/index.css` avec les classes utilitaires Tailwind.

## 📱 Responsive Design

L'application est entièrement responsive :
- **Mobile** : Vue adaptée pour les petits écrans
- **Tablet** : Layout optimisé pour les tablettes
- **Desktop** : Interface complète avec toutes les fonctionnalités

## 🔮 Fonctionnalités Futures

- [ ] **Thème sombre**
- [ ] **Synchronisation cloud**
- [ ] **Notifications push**
- [ ] **Export PDF/Excel**
- [ ] **Collaboration en temps réel**
- [ ] **Intégration calendrier**
- [ ] **Templates de tâches**
- [ ] **Rapports avancés**

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [React](https://reactjs.org/) - Bibliothèque UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide](https://lucide.dev/) - Icônes
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) - Drag & Drop

---

**Développé avec ❤️ en React et TypeScript** 