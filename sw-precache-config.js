module.exports = {
  staticFileGlobs: [
    '/index.html',
    'manifest.json',
    'bower_components/webcomponentsjs/webcomponents-loader.js',
    'bower_components/polymer/*',
    '/src/my-app.html',
    '/src/my-kc.html',
    '/src/my-survey-view.html',
    '/src/my-survey-grid.html',
    '/src/submission-dialog.html',
    '/src/shared-styles.html'
  ],
  navigateFallback: 'index.html',
  runtimeCaching: [
    {
      urlPattern: /\/bower_components\/webcomponentsjs\/.*.js/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache'
        }
      }
    },
    {
      urlPattern: /\/src\/*.*/,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxEntries: 200,
          name: 'items-cache'
        }
      }
    }
  ]
};
