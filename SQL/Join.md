## course

```sql
select * from Exam_STUDENT_50.dbo.course;
```

||||
|---|---|---|
|cid|cname|tid|
|01|語文|02|
|02|數學|01|
|03|英語|03|
||||

## sc

```sql
select * from Exam_STUDENT_50.dbo.sc;
```

||||
|---|---|---|
|sid|cid|score|
|01|01|80.0|
|01|02|90.0|
|01|03|99.0|
|02|01|70.0|
|02|02|60.0|
|02|03|80.0|
|03|01|80.0|
|03|02|80.0|
|03|03|80.0|
|04|01|50.0|
|04|02|30.0|
|04|03|20.0|
|05|01|76.0|
|05|02|87.0|
|06|01|31.0|
|06|03|34.0|
|07|02|89.0|
|07|03|98.0|
||||

## join

```sql
select c.cid, c.cname, sc.score 
from Exam_STUDENT_50.dbo.course c 
join Exam_STUDENT_50.dbo.sc sc 
on c.cid = sc.cid;
```

||||
|---|---|---|
|cid|cname|score|
|01|語文|80.0|
|02|數學|90.0|
|03|英語|99.0|
|01|語文|70.0|
|02|數學|60.0|
|03|英語|80.0|
|01|語文|80.0|
|02|數學|80.0|
|03|英語|80.0|
|01|語文|50.0|
|02|數學|30.0|
|03|英語|20.0|
|01|語文|76.0|
|02|數學|87.0|
|01|語文|31.0|
|03|英語|34.0|
|02|數學|89.0|
|03|英語|98.0|
||||


## right join

```sql
select c.cid, c.cname, sc.score from Exam_STUDENT_50.dbo.course c 
right join Exam_STUDENT_50.dbo.sc sc 
on c.cid = sc.cid;
```

||||
|---|---|---|
|cid|cname|score|
|01|語文|80.0|
|02|數學|90.0|
|03|英語|99.0|
|01|語文|70.0|
|02|數學|60.0|
|03|英語|80.0|
|01|語文|80.0|
|02|數學|80.0|
|03|英語|80.0|
|01|語文|50.0|
|02|數學|30.0|
|03|英語|20.0|
|01|語文|76.0|
|02|數學|87.0|
|01|語文|31.0|
|03|英語|34.0|
|02|數學|89.0|
|03|英語|98.0|
||||

## left join

```sql
select c.cid, c.cname, sc.score from Exam_STUDENT_50.dbo.course c 
left join Exam_STUDENT_50.dbo.sc sc 
on c.cid = sc.cid;
```

||||
|---|---|---|
|cid|cname|score|
01|語文|80.0
01|語文|70.0
01|語文|80.0
01|語文|50.0
01|語文|76.0
01|語文|31.0
02|數學|90.0
02|數學|60.0
02|數學|80.0
02|數學|30.0
02|數學|87.0
02|數學|89.0
03|英語|99.0
03|英語|80.0
03|英語|80.0
03|英語|20.0
03|英語|34.0
03|英語|98.0
||||

## group by

```sql
select c.cid, c.cname, max(sc.score) score 
from Exam_STUDENT_50.dbo.course c 
left join Exam_STUDENT_50.dbo.sc sc 
on c.cid = sc.cid
group by c.cid, c.cname
order by c.cid;
```

### wrong:

```sql
select c.cid, c.cname, max(sc.score) score 
from Exam_STUDENT_50.dbo.course c 
left join Exam_STUDENT_50.dbo.sc sc 
on c.cid = sc.cid
group by c.cid, c.cname,sc.score;
```

||||
|---|---|---|
|cid|cname|score|
01|語文|80.0
01|語文|70.0
01|語文|80.0
01|語文|50.0
01|語文|76.0
01|語文|31.0
02|數學|90.0
02|數學|60.0
02|數學|80.0
02|數學|30.0
02|數學|87.0
02|數學|89.0
03|英語|99.0
03|英語|80.0
03|英語|80.0
03|英語|20.0
03|英語|34.0
03|英語|98.0
||||


## group by depend on another column
```sql
select sbt.cid,sbt.cname,max(sbt.score) score,sc2.sid 
from Exam_STUDENT_50.dbo.sc sc2
join
	(
		select c.cid, c.cname, max(sc.score) score 
		from Exam_STUDENT_50.dbo.course c 
		left join Exam_STUDENT_50.dbo.sc sc 
		on c.cid = sc.cid
		group by c.cid,c.cname
	) sbt
on sbt.cid = sc2.cid and sbt.score = sc2.score
group by sbt.cid, sbt.cname,sc2.sid
order by sbt.cid
```

|||||
|---|---|---|---|
cid|cname|score|sid
01|語文|80.0|01        
01|語文|80.0|03        
02|數學|90.0|01        
03|英語|99.0|01        
|||||

### error

```sql
select c.cid, c.cname,sc.score,sc.sid 
from Exam_STUDENT_50.dbo.course c
join 
	(
		select cid,max(score) score
		from Exam_STUDENT_50.dbo.sc 
		group by cid
	) sc
on sc.cid = c.cid
```

```
Msg 207, Level 16, State 1, Line 34
Invalid column name 'sid'.
```