

```
HttpSecurity http
```

- [HttpSecurity](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html)

### AuthenticationProvider

```java
@Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider);
    }
```

### InMemoryUserDetailsManager
```java
    @Override
    @Bean
    public UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        ...
        manager.createUser(user1);
        manager.createUser(user2);
        return manager;
    }        
```
