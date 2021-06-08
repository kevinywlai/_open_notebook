```sql
USE [Exam_STUDENT_50]

CREATE TABLE [dbO].[big_int_test](
	[id][bigint] IDENTITY(1,1) NOT NULL,
	[name][nvarchar](10),
	constraint [PK_big_int_test] PRIMARY KEY CLUSTERED(
		[id] ASC
	)
) on [PRIMARY]

insert into [dbO].[big_int_test] (name) values ('abc');

delete [dbO].[big_int_test] where id = 2

select * from [dbO].[big_int_test] 

--reset
DBCC CHECKIDENT ('big_int_test', RESEED, 0)


```

# Reference:
- [Reset identity seed after deleting records in SQL Server, stackoverflow](https://stackoverflow.com/questions/21824478/reset-identity-seed-after-deleting-records-in-sql-server)