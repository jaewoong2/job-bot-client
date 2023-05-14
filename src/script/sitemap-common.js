// sitemap-common.js

// 패키지 설치
import fs from 'fs'
import globby from 'globby'
import prettier from 'prettier'

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString()
const JOBBOT_DOMAIN = 'https://www.job-bot.site'

//
const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' })

;(async () => {
  // 포함할 페이지와 제외할 페이지 등록
  const pages = await globby([
    // include
    '../app/**/*.tsx',
    '../app/*.tsx',
    // exclude
    '!../pages/_app.tsx',
    '!../pages/_document.tsx',
    '!../pages/_error.tsx',
    '!../pages/admin/*.tsx',
    '!../pages/api/*.tsx',
    // (...중간 생략)
    '!../pages/**/[t_id]/*.tsx',
    '!../pages/**/[t_id]/**/*.tsx',
  ])

  // 파일 경로를 도메인 형태로 변경
  // ../pages/category/index.tsx -> https://wwww.codeit.kr/category
  // ../pages/community/threads -> https://wwww.codeit.kr/community/threads
  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace('../app/', '')
          .replace('.tsx', '')
          .replace(/\/page/g, '')
        const routePath = path === 'index' ? '' : path
        return `
          <url>
            <loc>${JOBBOT_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `
      })
      .join('')}

  const generatedSitemap = 
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pagesSitemap}
    </urlset>`

  const formattedSitemap = [formatted(generatedSitemap)]

  fs.writeFileSync('../public/sitemap/sitemap-common.xml', formattedSitemap, 'utf8')
})()
