## data.sql 
- src/main/resources
```sql
insert into course(id, name) values(1001,'test class A');
```

## Course.java
- entity/

```java
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Course {
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	
	protected Course() {};
	
	public Course(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
```

## CourseRepository.java
- repository/
```java
package com.fb.pr20200828.repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fb.pr20200828.entity.Course;

@Repository
public class CourseRepository {
	@Autowired
	EntityManager em;
	
	@Transactional 
	public void insert(long id,String course) {
		em.createNativeQuery("insert into course(id, name) values(?,?)")
		.setParameter(1, id)
		.setParameter(2, course)
		.executeUpdate();
	}
	
	public Course findById(long id) {
		return em.find(Course.class, id);
	}
}
```

## Controller

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.fb.pr20200828.entity.Course;
import com.fb.pr20200828.repository.CourseRepository;

@Controller
public class MainController {
	
	@Autowired
	private CourseRepository repository;
	
	@GetMapping("/main")
	public String goMain() {
		repository.insert(10002L,"test course");
		
		Course course = repository.findById(10002L);
		System.out.println(course.getName());
		return "main.html";
	}
}
```