import React, { useMemo } from 'react'
import articles from '@/articles'
import { useParams } from 'react-router-dom'
import { SEO } from '@/components/blocks/SEO'

const Articles = () => {
  const params = useParams<{ article: string }>()

  const article = useMemo(() => {
    return articles.articles.map(
      ({ ReactComponent, attributes }) =>
        attributes.title === decodeURIComponent(params.article!) && (
          <div key={attributes.title}>
            <SEO
              description={attributes.description}
              title={attributes.title}
              name={attributes.title}
            />
            <div className="dark:bg-darkBg-400 dark:text-white p-6 markdown-body max-w-5xl mx-auto">
              <div className="border-b mb-5">
                <p className="text-3xl">{attributes.title}</p>
                <div className="flex justify-between">
                  <div>작성자: {attributes.author}</div>
                  <p>작성날짜: {attributes.created}</p>
                </div>
              </div>
              <ReactComponent />
            </div>
          </div>
        )
    )
  }, [articles])

  return <div>{article}</div>
}

export default Articles
