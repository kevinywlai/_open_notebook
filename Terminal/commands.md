
# base64

```shell
echo -n "test:12345" | base64
echo -n "dGVzdDoxMjM0NQ==" | base64 -d
```

# sha256

```shell
echo -n "test:12345" | shasum -a 256
```

# curl

```shell
curl -u user:a3efa0d6-8e17-4e06-8793-9aca9801c271 http://localhost:8080/ecsse/api/test1

curl -i -H 'Authorization:Basic am9objoxMjM0NQ==' http://localhost:8080/ecsse/api/test1
```