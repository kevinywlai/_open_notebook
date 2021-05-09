- [Sending email in Spring with Thymeleaf](https://www.thymeleaf.org/doc/articles/springmail.html)


- [Thymeleaf + Spring Security integration basics](https://www.thymeleaf.org/doc/articles/springsecurity.html)


- [Tutorial: Thymeleaf + Spring](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html)


## Example: Thymeleaf with Java EE

- Reference:

    - [Thymeleaf » 3.0.11.RELEASE](https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf/3.0.11.RELEASE)
    - [Thymeleaf Spring5 » 3.0.11.RELEASE](https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf-spring5/3.0.11.RELEASE)

    - [Group: Thymeleaf](https://mvnrepository.com/artifact/org.thymeleaf)
        - Thymeleaf Spring4
        - Thymeleaf Spring3

    - [SLF4J API Module » 1.7.25 (slf4j-api)](https://mvnrepository.com/artifact/org.slf4j/slf4j-api/1.7.25) 
        - for: java.lang.NoClassDefFoundError: org/slf4j/LoggerFactory
    

    - [ATTOPARSER » 2.0.5.RELEASE](https://mvnrepository.com/artifact/org.attoparser/attoparser/2.0.5.RELEASE)
        - for: java.lang.NoClassDefFoundError: org/attoparser/IMarkupParser

    - [UNBESCAPE » 1.1.6.RELEASE](https://mvnrepository.com/artifact/org.unbescape/unbescape/1.1.6.RELEASE)
        - for: java.lang.NoClassDefFoundError: org/unbescape/html/HtmlEscape

    - Pivotal Certified Professional Core Spring 5 Developer Exam
        

### Code:

#### config:

<details><summary>Details</summary>

```java
package com.fbtest.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

import javax.servlet.ServletContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.fbtest.controllers"})
public class WebConfig implements WebMvcConfigurer, ServletContextAware {

	private ServletContext servletContext;
	
	@Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }
	
	@Bean
    public ServletContextTemplateResolver templateResolver() {
        ServletContextTemplateResolver resolver =
            new ServletContextTemplateResolver(servletContext);
        resolver.setPrefix("/WEB-INF/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode("HTML5");
        resolver.setCharacterEncoding("UTF-8");
        resolver.setCacheable(false);
        return resolver;
    }
	
	@Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());
        //templateEngine.setTemplateEngineMessageSource(messageSource());
        return templateEngine;
    }
	
	@Bean
    public ThymeleafViewResolver viewResolver() {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setTemplateEngine(templateEngine());
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setOrder(1);
        return viewResolver;
    }
}
```

</details>

<br>

#### controllers

<details><summary>Details</summary>

```java
package com.fbtest.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class Main1Controller {

	@GetMapping("index")
	public String getIndex(Model model) {
		model.addAttribute("test1", "This a test!");
		return "index";
	}	
}
```

</details>

<br>

#### xml

##### spring/appServlet/servlet-context.xml

<details><summary>Details</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans:beans xmlns="http://www.springframework.org/schema/mvc"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:beans="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

	<!-- DispatcherServlet Context: defines this servlet's request-processing infrastructure -->
	
	<!-- Enables the Spring MVC @Controller programming model -->
	<annotation-driven />

	<!-- Handles HTTP GET requests for /resources/** by efficiently serving up static resources in the ${webappRoot}/resources directory -->
<!-- 	<resources mapping="/resources/**" location="/resources/" /> -->
	<resources mapping="/views/**" location="/WEB-INF/views/" />

	<!-- Resolves views selected for rendering by @Controllers to .jsp resources in the /WEB-INF/views directory 
	<beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<beans:property name="prefix" value="/WEB-INF/views/" />
		<beans:property name="suffix" value=".jsp" /> 
	</beans:bean>
	-->
	<context:component-scan base-package="com.fbtest" />
	
	<!--  for db -->
<!-- 	<context:component-scan base-package="com.packtpub.springsecurity.web"/> -->
</beans:beans>
```

</details>

<br>

##### spring/root-context.xml

<details><summary>Details</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:jpa="http://www.springframework.org/schema/data/jpa"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
						http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/data/jpa http://www.springframework.org/schema/data/jpa/spring-jpa.xsd
		http://www.springframework.org/schema/tx 
		http://www.springframework.org/schema/tx/spring-tx.xsd
		http://www.springframework.org/schema/context 
		http://www.springframework.org/schema/context/spring-context.xsd">
	
	<!-- Root Context: defines shared resources visible to all other web components -->
	<tx:annotation-driven/>
	
	<!-- Root Context: defines shared resources visible to all other web components -->
<!-- 	
	<bean id="datasource" class="org.apache.commons.dbcp.BasicDataSource">
		<property name="url" value="jdbc:mysql://localhost:3307/fu"/>
		<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
		<property name="username" value="root"/>
		<property name="password" value=""/>
	</bean>
	 -->
<!-- 
	<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"/>
	 -->
	<context:component-scan base-package="com.fbtest"/> 
</beans>
```

</details>

<br>

##### web.xml

<details><summary>Details</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">

	
<!-- 	<filter> -->
<!-- 		<filter-name>springSecurityFilterChain</filter-name> -->
<!-- 		<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class> -->
<!-- 	</filter> -->
<!-- 	<filter-mapping> -->
<!-- 		<filter-name>springSecurityFilterChain</filter-name> -->
<!-- 		<url-pattern>/*</url-pattern> -->
<!-- 	</filter-mapping> -->
	

	<!-- The definition of the Root Spring Container shared by all Servlets and Filters -->
	<context-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
		    /WEB-INF/spring/root-context.xml
<!-- 		    /WEB-INF/spring/security-context.xml -->
		</param-value>
	</context-param>
	
	<!-- Creates the Spring Container shared by all Servlets and Filters -->
 
	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

	<!-- Processes application requests -->
	<servlet>
		<servlet-name>appServlet</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>/WEB-INF/spring/appServlet/servlet-context.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>
		
	<servlet-mapping>
		<servlet-name>appServlet</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>
	
	<!-- encodingFilter start -->	
	<filter>  
	    <filter-name>encodingFilter</filter-name>  
	    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>  
	    <init-param>  
	       <param-name>encoding</param-name>  
	       <param-value>UTF-8</param-value>  
	    </init-param>  
	    <init-param>  
	       <param-name>forceEncoding</param-name>  
	       <param-value>true</param-value>  
	    </init-param>  
	</filter>  
	<filter-mapping>  
	    <filter-name>encodingFilter</filter-name>  
	    <url-pattern>/*</url-pattern>  
	</filter-mapping> 
	<!-- encodingFilter end -->	
</web-app>
```

</details>

<br>

#### html

- WEB-INF/index.html

<details><summary>Details</summary>

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
    <body>
        <h1>Index</h1>
        <span th:text="${test1}" />
    </body>
</html>
```

</details>

<br>

## Example: On thymeleaf.org
- [2 The SpringStandard Dialect](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html#views-and-view-resolvers-in-thymeleaf)
