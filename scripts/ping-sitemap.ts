import https from 'https'

const sitemapUrl = 'https://yourdomain.com/sitemap.xml'
const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`

https.get(pingUrl, (res) => {
  console.log('📡 Sitemap pinged with status code:', res.statusCode)
})
