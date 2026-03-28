/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kimberlyvanessa.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: ['https://kimberlyvanessa.com/sitemap.xml'],
  },
  exclude: ['/api/*'],
};
