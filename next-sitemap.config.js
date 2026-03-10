// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.wakacyjnyhit.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/auth/*', '/login'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/', '/login'],
      },
    ],
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      await config.transform(config, '/oferty'),
      await config.transform(config, '/jak-to-dziala'),
    ];
  },
};
