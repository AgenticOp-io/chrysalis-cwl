# `82-database` — tip 1.0.74

CWL names the engine, the tables, and the bound row operations. The statements are the same on sqlite, postgres, mysql, mariadb, sqlserver, and oracle. This gold executes on sqlite. The other engines compile the same insert with the title kept as a parameter. A SQL string is not a CWL statement.

| Route | What it proves |
| --- | --- |
| `GET /board` | Open rows, nested tag column, empty `else html` |
| `GET /notes/:id` | One row, or the missing branch |
| `POST /notes` | Insert, then read that row |
| `POST /notes/:id` | Update with a required where |
| `POST /notes/:id/tags` | Insert a child row |
| `DELETE /notes/:id` | Delete with a required where |
| `GET /bad` | Unknown column is `cwl:unknown-db-column` and does not run |
| `POST /nowhere` | Update without where is `cwl:db-where-required` and does not run |
