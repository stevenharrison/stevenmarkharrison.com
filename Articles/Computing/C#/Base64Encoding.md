---
Id: 760183b1-a055-42fc-af61-e6f53af6e4b6
Title: Encoding a Username and Password in base64 for Basic Authentication in C#
PublishedOn: '2022-02-14'
Published: true
Tags: [C#, Base64, "Basic Authentication", "HTTP"]
Sources:
    - https://www.thecodebuzz.com/basic-authentication-base64-string-authorization-header-encoding-decoding-csharp/
---

```C#
    using System.Text;
    using System.Net.Http;
    using System.Net.Http.Headers;
    
    HttpClient client = new HttpClient();
    client.DefaultRequestHeaders.Accept.Clear();
    var encodedString = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{UserName}:{Password}"));
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", encodedString);
    
```