import { StaterCodeType } from "./types";

export const staterCode: StaterCodeType = {
  react: [
    {
      path: `index.html`,
      content: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
  </html>
        `,
    },
    {
      path: `src/main.jsx`,
      content: `
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
        `,
    },
    {
      path: `src/App.jsx`,
      content: `
  import React from 'react';
  
  function App() {
    return (
      <div>
        <h1>Hello, React Vite!</h1>
      </div>
    );
  }
  
  export default App;
        `,
    },
    {
      path: `vite.config.js`,
      content: `
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
const express = require('express');
  
  export default defineConfig({
    plugins: [react()],
  });
        `,
    },
    {
      path: `package.json`,
      content: `
  {
    "name": "react-vite-app",
    "version": "1.0.0",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "serve": "vite preview"
    },
    "dependencies": {
      "react": "^17.0.2",
      "react-dom": "^17.0.2"
    },
    "devDependencies": {
      "@vitejs/plugin-react": "^1.0.0",
      "vite": "^2.0.0"
    }
  }
        `,
    },
  ],

  node: [
    {
      path: `index.js`,
      content: `
      const app = express();
      const port = 3000;

      app.get('/', (req, res) => {
        res.send('Hello, Express!');
      });

      app.listen(port, () => {
        console.log(\`Server is running on http://localhost:\${port}\`);
      });
      `,
    },
    {
      path: `package.json`,
      content: `
      {
        "name": "express-app",
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
      "start": "node index.js"
        },
        "dependencies": {
      "express": "^4.17.1"
        }
      }
      `,
    },
  ],
};
