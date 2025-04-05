require("dotenv").config({
  path: `.env`,
});

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mind Clash`,
        short_name: `MC`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `./src/assets/mclogo.png`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet-async`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
        },
      },
    },
  ],

  //THIS PART ENABLES BACKEND PROXYING
  developMiddleware: app => {
    const { createProxyMiddleware } = require("http-proxy-middleware");
    app.use(
      ["/socket.io", "/stats", "/leaderboard"],
      createProxyMiddleware({
        target: "http://localhost:3000", // backend server
        ws: true, // Enable websockets (important for Socket.IO)
        changeOrigin: true,
      })
    );
  },
};
