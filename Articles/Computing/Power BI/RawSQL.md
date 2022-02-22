---
Id: 4108cddb-5b1e-4d9a-b588-923585b0e4be
Title: Power Query with Raw SQL
PublishedOn: '2022-02-22'
Published: true
Tags: [Power BI, Power Query, SQL]
Sources:
    - https://dba.stackexchange.com/questions/148321/list-jobs-schedules-and-next-scheduled-run-datetimes
---

```m
let
    Source = Sql.Database("DCPRODAW438", "msdb", [Query="SELECT * FROM table*"])
in
    Source
```