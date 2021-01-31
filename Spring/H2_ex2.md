## config
```java
@Configuration
@ComponentScan("com.fbtest.pr20210131")
public class DatasourceConfig {

	@Bean(name = "h2Datasource")
	public DataSource h2Datasource() {
		EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
		EmbeddedDatabase db = builder
				.setType(EmbeddedDatabaseType.H2)
				.addScript("db/create-table.sql")
				.build();
		return db;
	}
}
```
```java
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

```

## src/main/resources/db
- create-table.sql

```sql
CREATE table customer_token (
customer_id VARCHAR(255) PRIMARY KEY
, create_time TIMESTAMP);
```

## @Repository

```java
@Repository
public class H2Dao {
	
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	@Autowired
	public H2Dao(DataSource h2Datasource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(h2Datasource);
	}
	
	public int insertOrUpdate(String customer_id, Timestamp now) {
		Map<String, Object> valueMap = new HashMap<>();
		
		StringBuilder sb = new StringBuilder("IF EXISTS (  ");
		StringBuilder sbValue = new StringBuilder();
		sb.append(" SELECT * FROM customer_token WHERE customer_id = :customer_id ");
		sb.append(" ) ");
		sb.append(" UPDATE customer_token SET create_time = :create_time WHERE customer_id = :customer_id ");
		sb.append(" ELSE ");
		sb.append(" INSERT INTO customer_token (");
		sb.append( " customer_id," );
		sbValue.append(" :customer_id ");
		valueMap.put("customer_id", customer_id);
		
		sbValue.append( ", " );
		
		sb.append( " create_time " );
		sbValue.append( " :create_time " );
		valueMap.put("create_time", now);
		
		sb.append( ") VALUES( " );
		sb.append(sbValue.toString());
		sb.append( " ) " );
		System.out.println("sql:" + sb.toString());
		return namedParameterJdbcTemplate.update(sb.toString(), valueMap);
	}
	
	public int insert(String customer_id, Timestamp now) {
		Map<String, Object> valueMap = new HashMap<>();
		StringBuilder sb = new StringBuilder();
		StringBuilder sbValue = new StringBuilder();
		sb.append(" INSERT INTO customer_token (");
		sb.append( " customer_id," );
		sbValue.append(" :customer_id ");
		valueMap.put("customer_id", customer_id);
		
		sbValue.append( ", " );
		
		sb.append( " create_time " );
		sbValue.append( " :create_time " );
		valueMap.put("create_time", now);
		
		sb.append( ") VALUES( " );
		sb.append(sbValue.toString());
		sb.append( " ) " );
		System.out.println("sql:" + sb.toString());
		return namedParameterJdbcTemplate.update(sb.toString(), valueMap);
		
	}
	
	public Timestamp query(String customer_id) {
		Map<String, Object> valueMap = new HashMap<>();
		
		String sql = " SELECT create_time FROM customer_token WHERE customer_id = :customer_id ";
		valueMap.put("customer_id", customer_id);
		
		return namedParameterJdbcTemplate.queryForObject(sql, valueMap, Timestamp.class);
	}
	
}
```

```java
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
```

## @RestController

```java
@RestController
public class MainController {
	
	@Autowired
	H2Dao h2Dao;
	
	@GetMapping("/get1")
	public String get1() {
		try {
			h2Dao.query("S222222222");

		}catch(EmptyResultDataAccessException e) {
			System.out.println(e.getMessage());
			
			LocalDateTime now = LocalDateTime.now();
			Timestamp timestamp = Timestamp.valueOf(now);
			h2Dao.insert("S222222222", timestamp);
			
			Timestamp timestamp2 = h2Dao.query("S222222222");
			LocalDateTime localDateTime = timestamp2.toLocalDateTime();
			System.out.println(localDateTime);
			//LocalDate localDate = timestamp2.toLocalDateTime().toLocalDate();
	        //System.out.println(localDate);
		}
		
		return "ok";
	}
	
	@GetMapping("/get2")
	public String get2() {
		try {
			Timestamp timestamp2 = h2Dao.query("S222222222");
			LocalDateTime localDateTime = timestamp2.toLocalDateTime();
			
			LocalDateTime localDateTimeNow = LocalDateTime.now();
			boolean test = localDateTimeNow.minusMinutes(2).isAfter(localDateTime);
			System.out.println("Timestamp:" + localDateTime.toString());
			System.out.println("Now:" + localDateTimeNow.toString());
			System.out.println(" > 2 min:" + test);
		}catch(EmptyResultDataAccessException e) {
			System.out.println(e.getMessage());
		}
		
		return "ok";
	}
	
}

```

```java

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
```

## pom.xml

```xml
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-jdbc</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-tomcat</artifactId>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
```