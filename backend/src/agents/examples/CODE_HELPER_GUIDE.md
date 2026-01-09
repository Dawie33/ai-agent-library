# 🤖 Guide d'utilisation - Code Helper Agent

## 📋 Description

L'agent **CodeHelper** est un assistant expert qui analyse votre code et fournit des recommandations détaillées avec une approche pédagogique adaptée aux développeurs juniors.

### Fonctionnalités principales

- ✅ Analyse selon 6 critères de qualité :
  - 🐛 Bugs (erreurs fonctionnelles)
  - ⚡ Performance
  - 🔒 Sécurité
  - 📖 Lisibilité
  - 🏗️ Architecture
  - ♻️ Bonnes pratiques

- ✅ Processus structuré en 5 étapes :
  1. Compréhension du code
  2. Identification des problèmes
  3. Solutions proposées (avec code AVANT/APRÈS)
  4. Priorisation des actions
  5. Évaluation et conseils personnalisés

## 🚀 Démarrage rapide

### 1. Configuration

L'agent utilise l'API OpenAI. Assurez-vous que votre clé API est configurée dans le fichier `.env` :

\`\`\`env
OPENAI_API_KEY=sk-...
\`\`\`

### 2. Démarrer l'application

\`\`\`bash
npm run start:dev
\`\`\`

L'application démarrera sur `http://localhost:3000`

## 📡 Utilisation via API REST

### Endpoint

\`\`\`
POST http://localhost:3000/api/agents/CodeHelper/execute
\`\`\`

### Format de la requête

\`\`\`json
{
  "prompt": "votre code à analyser"
}
\`\`\`

### Exemple avec curl

\`\`\`bash
curl -X POST http://localhost:3000/api/agents/CodeHelper/execute \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "function add(a, b) { return a + b; }"
  }'
\`\`\`

### Exemple avec fetch (JavaScript)

\`\`\`javascript
async function analyzeCode(code) {
  const response = await fetch('http://localhost:3000/api/agents/CodeHelper/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: code,
    }),
  });

  const result = await response.json();

  if (result.success) {
    console.log('Analyse:', result.result.result);
    console.log('Métadonnées:', result.result.metadata);
  }
}
\`\`\`

## 📊 Format de la réponse

\`\`\`json
{
  "success": true,
  "agent": "CodeHelper",
  "result": {
    "result": "... analyse complète du code ...",
    "metadata": {
      "agentType": "code-helper",
      "codeAnalyzed": "... code original ...",
      "language": "typescript",
      "model": "gpt-4o",
      "tokensUsed": 1234
    },
    "timestamp": "2024-01-09T10:30:00.000Z",
    "executionTime": 2500
  }
}
\`\`\`

## 💡 Exemples d'utilisation

### Exemple 1 : Analyser une fonction simple

**Code à analyser :**
\`\`\`javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
\`\`\`

**Requête :**
\`\`\`bash
curl -X POST http://localhost:3000/api/agents/CodeHelper/execute \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "function calculateTotal(items) {\\n  let total = 0;\\n  for (let i = 0; i < items.length; i++) {\\n    total = total + items[i].price;\\n  }\\n  return total;\\n}"
  }'
\`\`\`

### Exemple 2 : Analyser un composant React

\`\`\`javascript
const code = \`
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`;

fetch('http://localhost:3000/api/agents/CodeHelper/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: code })
});
\`\`\`

### Exemple 3 : Analyser un service NestJS

\`\`\`typescript
const code = \`
@Injectable()
export class UserService {
  constructor(private db: Database) {}

  async getUser(id: string) {
    return this.db.query('SELECT * FROM users WHERE id = ' + id);
  }
}
\`;

// Envoi de la requête...
\`\`\`

⚠️ **Note** : Cet exemple contient une vulnérabilité d'injection SQL que l'agent détectera et expliquera comment corriger!

## 🔧 Configuration avancée

### Modifier le modèle utilisé

Par défaut, l'agent utilise `gpt-4o`. Pour changer le modèle, modifiez le fichier `code-helper.agent.ts` :

\`\`\`typescript
const completion = await this.openai.chat.completions.create({
  model: 'gpt-4o-mini', // ou 'gpt-3.5-turbo'
  // ...
});
\`\`\`

### Ajuster la température

La température contrôle la créativité de la réponse (0 = très déterministe, 1 = très créatif) :

\`\`\`typescript
temperature: 0.7, // Valeur entre 0 et 1
\`\`\`

### Augmenter le nombre de tokens

Pour des analyses plus longues :

\`\`\`typescript
max_tokens: 8000, // Par défaut: 4000
\`\`\`

## 📝 Langages supportés

L'agent détecte automatiquement le langage du code :

- ✅ TypeScript
- ✅ JavaScript
- ✅ Python
- ✅ Java
- ✅ PHP
- ✅ Et bien d'autres...

## ❓ FAQ

### Q : Combien de temps prend une analyse ?
**R :** Entre 2 et 10 secondes en fonction de la taille du code et de la charge de l'API OpenAI.

### Q : Quelle est la taille maximale de code analysable ?
**R :** Environ 4000 tokens (~ 3000 mots ou 500 lignes de code). Au-delà, la réponse peut être tronquée.

### Q : L'agent fonctionne-t-il hors ligne ?
**R :** Non, il nécessite une connexion Internet pour appeler l'API OpenAI.

### Q : Puis-je utiliser Claude au lieu d'OpenAI ?
**R :** Oui! Il suffit de modifier l'agent pour utiliser l'API Anthropic à la place.

## 🐛 Dépannage

### Erreur "OPENAI_API_KEY not found"
- Vérifiez que le fichier `.env` existe à la racine du projet
- Vérifiez que la clé `OPENAI_API_KEY` est bien définie

### Erreur "Invalid API key"
- Vérifiez que votre clé OpenAI est valide
- Vérifiez que vous avez des crédits disponibles sur votre compte OpenAI

### Timeout / Pas de réponse
- Vérifiez votre connexion Internet
- L'API OpenAI peut être temporairement surchargée, réessayez dans quelques instants

## 📚 Ressources

- [Documentation OpenAI](https://platform.openai.com/docs)
- [Documentation NestJS](https://docs.nestjs.com)
- [Guide de code review](https://google.github.io/eng-practices/review/)

## 🤝 Contribution

N'hésitez pas à améliorer cet agent en proposant des modifications!

### Idées d'amélioration :
- [ ] Support de l'upload de fichiers
- [ ] Analyse de plusieurs fichiers en même temps
- [ ] Comparaison avant/après pour du refactoring
- [ ] Génération de tests unitaires automatiques
- [ ] Intégration avec des linters (ESLint, Prettier)

---

Développé avec ❤️ pour aider les développeurs à progresser
