AUTH
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

STUDENTS
GET    /api/students
GET    /api/students/{id}
PUT    /api/students/{id}

THEMES
POST   /api/themes
GET    /api/themes/{id}
PUT    /api/themes/{id}/validate
PUT    /api/themes/{id}/reject

THESIS
POST   /api/thesis
GET    /api/thesis/{id}

DEFENSES
GET    /api/defenses
GET    /api/defenses/{id}

PLANNING
POST   /api/planning/generate
GET    /api/planning
POST   /api/planning/replan

EVALUATIONS
GET    /api/evaluations/{defense}
POST   /api/evaluations

RESULTS
GET    /api/results/{defense}
POST   /api/results/{defense}/validate

PV
POST   /api/pv/{defense}/generate
GET    /api/pv/{id}
GET    /api/pv/{id}/download



Otran'reto no apesaina mba @ zay mifanaraka ny zavatra ataotsika ref mampifandray ny API tsika.............