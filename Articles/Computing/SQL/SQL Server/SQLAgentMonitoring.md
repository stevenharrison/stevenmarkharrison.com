---
Id: 1f1bcd4a-e8f5-4bd0-83c2-2903e1cc7609
Title: Monitoring SQL Agent Jobs
PublishedOn: '2022-02-17'
Published: true
Tags: [SQL Server, T-SQL, SQLAgent]
Sources:
    - https://dba.stackexchange.com/questions/148321/list-jobs-schedules-and-next-scheduled-run-datetimes
---

# SQL Agent

### SQL Agent Roles

In order to read from the SQL Agent tables in SQL Server you will need access. SQLAgentReaderRole will give you base access, but some of the tables will require Select access on the msdb database.

```sql
    USE msdb
    ALTER ROLE SQLAgentReaderRole ADD MEMBER "username"
```

## Job Status Query

To query the current status of jobs, you can use the following query. The table [sys]

```sql
SELECT 
	A.[job_id] AS [JobID],
	A.[name] AS [JobName],
	TRY_CAST(CAST(D.last_run_date AS VARCHAR) + ' ' +
		LEFT(CAST(D.last_run_time AS VARCHAR), CASE WHEN LEN(CAST(D.last_run_time AS VARCHAR)) = 6 THEN 2 ELSE 1 END) 
		+ ':'+ SUBSTRING(RIGHT(CAST(D.last_run_time AS VARCHAR), 4), 1, 2) 
		+ ':' + RIGHT(CAST(D.last_run_time AS VARCHAR), 2)
	AS DATETIME) AS [LastRunDate],
	(SELECT SUM(last_run_duration) FROM [msdb].[dbo].sysjobsteps WHERE job_id = A.job_id) AS [LastRunDurationInSeconds],
	(SELECT AVG(run_duration) FROM msdb.dbo.sysjobhistory WHERE job_id = A.job_id AND step_id = 0 AND run_status = 1) AS [AvgSuccessfulRunDuration], 
	B.[name] AS [ServerName],
	E.[name] AS [JobOwner],
	C.[name] AS [JobCategory],
	A.[description] AS [JobDescription],
	A.[enabled] AS [IsEnabled],
	A.[date_created] AS [JobCreatedOn],
	A.[date_modified] AS [JobLastModifiedOn],
	A.[start_step_id] AS [JobStartStep],
	D.[step_name] AS [JobStartStepName],
	CASE WHEN G.[schedule_uid] IS NULL THEN 'No' ELSE 'Yes' END AS [IsScheduled],
	G.[name] AS [JobScheduleName],
	CASE A.[delete_level] WHEN 0 THEN 'Never' WHEN 1 THEN 'On Success' WHEN 2 THEN 'On Failure' WHEN 3 THEN 'On Completion' END AS [JobDeletionCriterion]
FROM
	[msdb].[dbo].[sysjobs] A
	LEFT JOIN [msdb].[sys].[servers] B ON A.originating_server_id = B.server_id
	LEFT JOIN [msdb].[dbo].[syscategories] C ON A.category_id = C.category_id
	LEFT JOIN [msdb].[dbo].[sysjobsteps] D ON A.job_id = D.job_id AND A.start_step_id = D.step_id
	LEFT JOIN [msdb].[sys].[database_principals] E ON A.owner_sid = E.[sid]
	LEFT JOIN [msdb].[dbo].[sysjobschedules] F ON A.job_id = F.job_id
	LEFT JOIN [msdb].[dbo].[sysschedules] G ON F.schedule_id = G.schedule_id
```

    SELECT
sj.name AS jobName
, ss.name AS scheduleName
, sja.next_scheduled_run_date
FROM msdb.dbo.sysjobs sj
INNER JOIN msdb.dbo.sysjobactivity sja ON sja.job_id = sj.job_id
INNER JOIN msdb.dbo.sysjobschedules sjs ON sjs.job_id = sja.job_id
INNER JOIN msdb.dbo.sysschedules ss ON ss.schedule_id = sjs.schedule_id
WHERE  (sja.next_scheduled_run_date > GETDATE())



