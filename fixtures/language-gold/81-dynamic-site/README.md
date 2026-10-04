# 81 — dynamic site

The same page source builds different HTML on each request. Host data supplies the rows. CWL does not query a database.

`/board` repeats open notes and their tags. An empty collection uses `else html`. `?view=closed` is a different document with status 503. `/notes/:id` renders one host record, or the missing branch when that record is absent.
