import React from 'react'
import articles from '@/articles'
import { useParams } from 'react-router-dom'

const Articles = () => {
  const params = useParams<{ article: string }>()

  return (
    <div>
      {articles.articles.map(
        ({ ReactComponent, attributes }) =>
          attributes.title === decodeURIComponent(params.article!) && (
            <div
              className="dark:bg-darkBg-400 dark:text-white p-6 markdown-body"
              key={attributes.title}
            >
              <div className="border-b mb-5">
                <p className="text-3xl">{attributes.title}</p>
                <div className="flex justify-between">
                  <div>작성자: {attributes.author}</div>
                  <p>작성날짜: {attributes.created}</p>
                </div>
              </div>
              <ReactComponent />
            </div>
          )
      )}
    </div>
  )
}

export default Articles
