
```sql
select * from Exam_STUDENT_50.dbo.sc;
```

||||
|---|---|---|
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
|||

```sql
select sid,min(score) as score, min(cid) as cid
from Exam_STUDENT_50.dbo.sc
group by sid;
```

|sid|score|cid|
|---|---|---|
|01|80.0|01|
|02|60.0|01|
|03|80.0|01|
|04|20.0|01|
|05|76.0|01|
|06|31.0|01|
|07|89.0|02|
||||


# Reference
- [SELECT all columns from distinct two columns](https://stackoverflow.com/questions/41649838/select-all-columns-from-distinct-two-columns)