# `56-db-table-name` — tip 1.0.48

Genome may name the logical table for `db.read` / `db.write`. No SQL in CWL; host executes.

| Route | Surface |
| --- | --- |
| `GET /users` | `db.read table users` |
| `POST /users` | `db.write table users` |
| `GET /catalog` | bare `db.read` |
