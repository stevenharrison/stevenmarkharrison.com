---
Id: 4aabb17a-7889-40fb-83ab-cad888bd3eaf
Title: A simple rust Web Assembly project
PublishedOn: '2022-02-14'
Published: true
Tags: [Rust]
Sources:
    - https://blog.logrocket.com/getting-started-with-webassembly-and-rust/
    - https://gist.github.com/HaiyangXu/ec88cbdce3cdbac7b8d5
---

# Web Assembly

First, install rust and the wasm-pack(https://rustwasm.github.io/wasm-pack/installer/).

To create a new wasm projet, use the following commands.
```
wasm-pack new wasm-project
cd wasm-project
wasm-pack build --target web
```

Add the following as index.html to the root directory.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>A mew Wasm Project</title>
  </head>

  <body>
    <script type="module">
      import { default as wasm, greet } from "./pkg/wasm_project.js";

      wasm().then((module) => {
        greet();
      });
    </script>
  </body>
</html>
```

Create a python file to serve the files, then navigate to localhost:8080 in the browser.

```python
import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map={
        '.manifest': 'text/cache-manifest',
	'.html': 'text/html',
        '.png': 'image/png',
	'.jpg': 'image/jpg',
	'.svg':	'image/svg+xml',
	'.css':	'text/css',
	'.js':	'application/x-javascript',
	'': 'application/octet-stream', # Default
    }

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()
```