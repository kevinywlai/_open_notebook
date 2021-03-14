## see:
_notebook

## import to cacerts

```cmd
keytool -import -trustcacerts -keystore "C:\<path>\lib\security\cacerts" -storepass <password> -noprompt -alias <cer> -file <cer>.cer
```

## list

```cmd
keytool -list -v -keystore "C:\<path>\lib\security\cacerts" -storepass <password>
```

# Reference:
- [blogs: self-signed-certificates-for-a-known-community](https://blogs.oracle.com/java-platform-group/self-signed-certificates-for-a-known-community)
