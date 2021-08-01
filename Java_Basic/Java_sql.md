# java.sql

## ConnectionManager

```java
package com.fbtest.pr20210725.utils.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {
    private static Connection connection;
    public static Connection openConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:330*/**","******","******");
            return connection;
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void closeConnection() {
        if (null != connection) {
            try {
                connection.close();
            } catch(SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```

## model

```java
public class RefreshToken {
    private String jti;
    private String ati;
    private String custemer_no;
    ...
```

## main

```java
package com.fbtest.pr20210725.utils.sql;

import com.google.gson.Gson;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ConnectTest {
    private static final String QUERY1 = "select * from refresh_token_table";

    public static void main(String[] args) throws SQLException {

        Connection connection = ConnectionManager.openConnection();
        PreparedStatement statement = connection.prepareStatement(QUERY1);
        ResultSet resultSet = statement.executeQuery();

        // select * from refresh_token_table
        List<RefreshToken> rList = new ArrayList<>();
        while (resultSet.next()) {
            rList.add(new RefreshToken(
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getString(4)
                    )
            );
        }
        System.out.println(new Gson().toJson(rList));
    }
}
```
