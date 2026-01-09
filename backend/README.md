# AI Agent Library - Backend

Backend NestJS pour la bibliothèque d'agents IA avec intégration OpenAI.

## 🚀 Démarrage rapide

### Depuis la racine du monorepo

```bash
# Lancer backend + frontend ensemble
npm run dev

# Lancer seulement le backend
npm run dev:backend
```

### Depuis le dossier backend

```bash
# Installation des dépendances (si pas déjà fait)
npm install

# Mode développement
npm run start:dev

# Mode debug
npm run start:debug

# Production
npm run build
npm run start:prod
```

Le serveur démarre sur **http://localhost:3000**

---

## 📁 Structure du projet

```
backend/
├── src/
│   ├── agents/                   # Module des agents IA
│   │   ├── base/
│   │   │   └── base-agent.ts     # Classe de base abstraite
│   │   ├── examples/
│   │   │   ├── code-helper.agent.ts      # Agent d'analyse de code (OpenAI)
│   │   │   ├── task-planner.agent.ts
│   │   │   └── debug-assistant.agent.ts
│   │   ├── interfaces/
│   │   │   └── agent.interface.ts
│   │   ├── services/
│   │   │   ├── agent-registry.service.ts
│   │   │   └── agent-executor.service.ts
│   │   └── agents.module.ts
│   ├── interfaces/               # Interfaces utilisateur
│   │   ├── rest/                 # API REST
│   │   ├── dashboard/
│   │   └── interfaces.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .env                          # Variables d'environnement
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔑 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du dossier `backend/` :

```env
# OpenAI API Key
OPENAI_API_KEY=sk-...

# Port (optionnel)
PORT=3000
```

**Important** : L'agent **CodeHelper** utilise l'API OpenAI et nécessite une clé API valide.

---

## 🤖 Agents disponibles

### 1. CodeHelper (Avec OpenAI GPT-4)

Agent expert pour analyser du code et fournir des recommandations détaillées avec une approche pédagogique.

**Modèle** : `gpt-4o` (OpenAI)
**Format de sortie** : JSON structuré
**Tags** : `coding`, `code-review`, `mentoring`, `analysis`, `best-practices`

**Endpoint** :
```bash
POST /api/agents/CodeHelper/execute
```

**Exemple de requête** :
```json
{
  "prompt": "function add(a, b) { return a + b; }"
}
```

**Structure du JSON retourné** :
```typescript
{
  resume: string;
  comprehension: {
    objectif: string;
    technologie: string;
    type: string;
  };
  problemes: {
    critiques: Array<{...}>;
    importants: Array<{...}>;
    mineurs: Array<{...}>;
  };
  solutions: Array<{...}>;
  planAction: {
    urgent: string[];
    important: string[];
    bonus: string[];
  };
  evaluation: {
    score: number;
    pointsForts: string[];
    axesProgression: string[];
    ressources: string[];
    conseilMentorat: string;
  };
}
```

---

### 2. TaskPlanner

Agent pour planifier et organiser des tâches de développement.

**Tags** : `planning`, `organization`, `productivity`

---

### 3. DebugAssistant

Agent pour aider au débogage de code.

**Tags** : `debugging`, `troubleshooting`, `errors`

---

## 🌐 API REST

### Endpoints disponibles

```bash
# Lister tous les agents
GET /api/agents

# Obtenir les détails d'un agent
GET /api/agents/:name

# Exécuter un agent
POST /api/agents/:name/execute

# Rechercher par tag
GET /api/agents/tags/:tag
```

### Exemple d'utilisation

```javascript
const response = await fetch('http://localhost:3000/api/agents/CodeHelper/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'votre code ici'
  })
});

const data = await response.json();
if (data.success) {
  const analysis = JSON.parse(data.result.result);
  console.log('Score:', analysis.evaluation.score);
}
```

---

## 🛠️ Développement

### Créer un nouvel agent

Voir les exemples dans `src/agents/examples/`

Tous les agents héritent de `BaseAgent` et implémentent la méthode `execute()`.

### Tests

```bash
npm run test          # Tests unitaires
npm run test:watch    # Mode watch
npm run test:cov      # Coverage
```

---

## 🔗 Intégration avec le frontend

Le frontend Vue.js (dans `../frontend/`) est configuré avec un proxy vers ce backend.

```javascript
// Depuis le frontend, appel direct via proxy
fetch('/api/agents/CodeHelper/execute', {
  method: 'POST',
  body: JSON.stringify({ prompt: code })
})
```

---

## 📄 Licence

UNLICENSED

## 👨‍💻 Auteur

Dawie SYLY
