# Module Evaluation (Caylah)

Ce module permet au jury de saisir une grille de notes, calcule les points pondérés, puis rend une évaluation immuable après validation et verrouillage.

## API protégée par Sanctum

| Méthode | Route | Rôle |
| --- | --- | --- |
| GET/POST | `/api/evaluation-grids` | lecture authentifiée / création admin |
| GET/PUT/DELETE | `/api/evaluation-grids/{id}` | lecture authentifiée / modification admin |
| POST | `/api/evaluation-grids/{id}/criteria` | admin |
| PUT/DELETE | `/api/evaluation-criteria/{id}` | admin |
| GET | `/api/evaluations/assigned` | jury (ses évaluations) |
| POST | `/api/evaluations` | jury |
| GET | `/api/evaluations/{id}` | propriétaire ou admin |
| PUT | `/api/evaluations/{id}/scores` | jury propriétaire, brouillon uniquement |
| POST | `/api/evaluations/{id}/validate` | jury propriétaire |
| POST | `/api/evaluations/{id}/lock` | admin |

La note pondérée d'un critère est `note × coefficient`; `weighted_score` est leur somme. La table `defense_evaluations` référence `defense_id` sans contrainte SQL : le module Planning ajoutera la table `defenses` et pourra compléter cette relation sans casser les migrations existantes.
