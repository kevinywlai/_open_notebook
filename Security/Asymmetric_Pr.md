## Key Pair Generator

```java
package com.fbtest.pr20210725.tests.pr20210826;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class Key {
    public static void main(String[] args) throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048,new SecureRandom());
        KeyPair bob = keyPairGenerator.generateKeyPair();
        System.out.println("Private");
        System.out.println(Base64.getEncoder().encodeToString(bob.getPrivate().getEncoded()));
        System.out.println("Public");
        System.out.println(Base64.getEncoder().encodeToString(bob.getPublic().getEncoded()));
    }
}
```

## Encode
```java

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.nio.charset.StandardCharsets;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class Encode {
    public static void main(String[] args) 
            throws NoSuchPaddingException, 
            NoSuchAlgorithmException, 
            IllegalBlockSizeException, 
            BadPaddingException, 
            SignatureException, InvalidKeySpecException, InvalidKeyException {
        
        final String original = "asfdads afdsafdsa hgdsfdggerfa adfwee hwretre qrtafsg sgdsfd.";

        final String cipherName = "RSA/ECB/OAEPWithSHA-256AndMGF1Padding";
        //Can use other cipher names, like "RSA/ECB/PKCS1Padding"
        Cipher cipher = Cipher.getInstance(cipherName);

        String bobPub = 
                "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnAWtYfNqW" +
                        "bT3gm0r5uJbN4++4ENRrTLq8WzNYX+U8iChmrHUGo7MuX4+Z" +
                        "c4xY2ud7UV1hGnzBspW7Z8k/e2oWprwFSvCozVDj0tHnMmMUmtY" +
                        "3Z5BTjqtwLpkWJNvL6EgyhwoNNbLEa3fYfCaAby119QvytPNBli8i" +
                        "jOrCCBeh4hZicNVdio1Vm7A0YUQgcrDznmeVB3b7eBt6CiMWhvzYR7" +
                        "lyOqiKj74oPPg221MWUSnHswEtt0BBDGHJ222WbXllake+CLNoJx/sa" +
                        "Q4N2nYAcHouXz0h/df81iXKs1yTo+6b0meBjIVlENs/yLGv6Zn7kVPZKRb" +
                        "T2y23dPaajeEewIDAQAB";
        
        byte[] bob = Base64.getDecoder().decode(bobPub);

        // Encrypt
        PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(bob));
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        final byte[] originalBytes = original.getBytes(StandardCharsets.UTF_8);
        byte[] cipherTextBytes = cipher.doFinal(originalBytes);
        System.out.println(Base64.getEncoder().encodeToString(cipherTextBytes));
    }
}

```

## Decode

```java
package com.fbtest.pr20210725.tests.pr20210826;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.nio.charset.StandardCharsets;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

public class Decode {
    public static void main(String[] args)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            IllegalBlockSizeException, BadPaddingException,
            InvalidKeySpecException, InvalidKeyException {

        String encodedText =
                "jRznUceixjZn81PmrZsujdDiOQjqIUyhxTGoiWQ72qwj33jMmWGywG" +
                        "MYnCaixcmNIdxjOZ8tMYsT+tjOdCmayubYOEgALhw0nFT3RW" +
                        "Sux1180QlXhfvhO0tENpOE5/l+UozqzaTIWrGty2ULLoJXjgMB" +
                        "WdXPcSMyDUIxSyLJZ+SSmFTe/9KLpxWsjnqvgAbhczElc0bO2VD" +
                        "Lx4tTN8CuHQ3r5TlfpWvzNC1/6XbGlnPq2D6+mtjSQYcUpnV62k" +
                        "/7ISzf3S9vwvZQEhyP4itPunv8PjKgORPR8Y43MJZegznTcsnfoZ" +
                        "djqTWA8E3yMfX0hGnrsv2YkTjF6Ea1HZ+caQ==";

        byte[] cipherTextBytes = Base64.getDecoder().decode(encodedText);

        String bobPri =
                "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcBa1" +
                        "h82pZtPeCbSvm4ls3j77gQ1GtMurxbM1hf5TyIKGasdQajsy5fj5lzj" +
                        "Fja53tRXWEafMGylbtnyT97ahamvAVK8KjNUOPS0ecyYxSa1jdnkFOOq3A" +
                        "umRYk28voSDKHCg01ssRrd9h8JoBvLXX1C/K080GWLyKM6sIIF6HiFmJw1V2" +
                        "KjVWbsDRhRCBysPOeZ5UHdvt4G3oKIxaG/NhHuXI6qIqPvig8+DbbUxZRKcez" +
                        "AS23QEEMYcnbbZZteWVqR74Is2gnH+xpDg3adgBwei5fPSH91/zWJcqzXJOj7p" +
                        "vSZ4GMhWUQ2z/Isa/pmfuRU9kpFtPbLbd09pqN4R7AgMBAAECggEAboU3BKPBOjq" +
                        "O+b0L1EmUBA+3TnVhbicbdll0QxR1Fe83irVdYlK1gtCCsusU4TBidqk1Tc8fcDf0y" +
                        "+5n7dhj4YrPdq/A+IvKh77zw4Sh+eBA2vw3lorKejOO0Y/euwaQi5rWgFeHEcbw7hfZg" +
                        "FGFHpYYJL1UBqLlK6DeDqufSrGYVPBlwMTdoEwx2rB/5pfV2SsmaAHO2PfGSrH7VH7Q7x" +
                        "vS5AiB88SxWV3TIRTTh2ZcGJBUymmjkf5qS6CRHQH04MJ9aPBaTSEWUOoWigcaHT9CYOas" +
                        "g3+Cvt0x7ZAtuz8hsECjmPML5i+cfffm0uoC/qR/I5T03H7jflmliwGzwQKBgQDJXM2dRwR" +
                        "sUM/H1403GT2bUdq8LZ3xTX8RavoikIFRNoU7uPIYQ5OgZyjOmnogTeprE41UVMNMowD2EwdHk" +
                        "gFD/tKIAWZhpnfkoeqzySiVGNgaqHykEWlcWRuFNlHn1iu4hMxnkO53flkEwJULdiK2c9Oqly" +
                        "N0wjPlkpTImDPrtwKBgQDGW2i2dQ48kzhv6rxHkZ/AD5AE2gC9LDBPMlxNyGauFsQuJNGNUYYKB" +
                        "TZsNeCS/FfJ99qbPKfEMmqv0RCO/1ynwBbgIcK2Xnx2yarrEFjLxmhfjqKgyOU9RRjCT+CiczP" +
                        "OeyyBRL63UAo+WSzIxVdH6D/OUIwD4VQrQob/+OI1XQKBgCaogHkfd0PsR9fQFDZtzBw" +
                        "TnPDfuSDoheqsJRWZtJoI449RtHjgEGmNJJJ1qdil3Mlt2YZFN7Fw4fBcOtuMtl19gKHH" +
                        "0wYQVZg5VbvqdLYbLPIBQtyk0xt9qADtKtBdl8s3A58mfgHG6gQ1jOfEaGmq1wo7Nf1mg1" +
                        "whxhq0zdMFAoGALsegCmfQ07hktwBFJxvQ8Rq6fGptgi/JtOPLoQyCKsxzt+42/X0cf4B7" +
                        "NUn/jKq2iYtKoxHK/xpkztIfdZoD4AwNWQ6dPSVLdThadtWEG4rPUrnw4LqAVdLV4/2ynJ" +
                        "1OuoOSG2p7EABwagPd6/ueefbsFVwpqUCa+RjXfcbUkoECgYEAo5+ELSQnEyqsVDjtY5c" +
                        "ACvBarXWUp3BppkoORIvTezYSgkzM3GJCbnbAtULzRQb0a+jmXZR5wk2i5fhcmecl2ib8" +
                        "wyM4VfFq95lWcPwoV7cwRAEEDZ0FpCEKCr3KKAXRbcXmpk/YCd8brjV5TUXgY3D0vuro4" +
                        "4FIokvMQERa2RI=";


        byte[] bob = Base64.getDecoder().decode(bobPri);
        PrivateKey privateKey = KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(bob));

        final String cipherName = "RSA/ECB/OAEPWithSHA-256AndMGF1Padding";
        //Can use other cipher names, like "RSA/ECB/PKCS1Padding"
        Cipher cipher = Cipher.getInstance(cipherName);

        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = cipher.doFinal(cipherTextBytes);
        String decryptedString = new String(decryptedBytes, StandardCharsets.UTF_8);
        System.out.println(decryptedString);
    }
}

```