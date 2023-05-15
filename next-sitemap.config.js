/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://job-bot.site',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
