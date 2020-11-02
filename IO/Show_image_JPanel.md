```java
    String respStr = restTemplate.postForObject(urlstr, request, String.class);
    
    JsonObject respJOb = new Gson().fromJson(respStr,JsonObject.class);
    String token = respJOb.get("Token").getAsString();
    String imgBase64Img = respJOb.get("Verification_code").getAsString();
    
    System.out.println(token);
    
    @SuppressWarnings("restriction")
    byte[] imgBase64Byte = new sun.misc.BASE64Decoder().decodeBuffer(imgBase64Img);
    BufferedImage image = ImageIO.read(new ByteArrayInputStream(imgBase64Byte));
    
    JFrame frame = new JFrame();
    frame.setSize(600, 200);
    JLabel label = new JLabel(new ImageIcon(image));
    frame.add(label);
    frame.setVisible(true);
```