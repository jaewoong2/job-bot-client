import Card from '@/components/atoms/Card'
import React, { useEffect, useRef } from 'react'
import { FcComments } from 'react-icons/fc'
import { RxDividerVertical } from 'react-icons/rx'
import articles from '@/articles'

const Home = () => {
  const coupangWrapper = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const coupangIframe = document.querySelector('.coupang-iframe')
    const $parent = coupangIframe?.parentElement

    if (coupangIframe) {
      coupangWrapper?.current?.appendChild(coupangIframe)
    }

    return () => {
      $parent?.appendChild(coupangIframe!)
    }
  }, [])

  return (
    <section className="flex flex-col gap-10">
      <div className="px-6 flex flex-col gap-5">
        <div className="p-3 w-full flex items-center gap-1 dark:bg-darkBg-300 dark:border-gray-500 border rounded-xl">
          <FcComments />
          <RxDividerVertical />
          <h2>꿀팁</h2>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10 max-w-6xl w-full gap-5"
          ref={coupangWrapper}
        >
          {articles.articles.map(({ attributes }, i) => (
            <div key={`${attributes.title}-${+i}`} className="flex justify-center w-full">
              <Card
                title={attributes.title}
                imgSrc={attributes.img}
                imgClassName="min-h-[100px]"
                className="sm:mx-auto"
                to={`/articles/${encodeURIComponent(attributes.title)}`}
              >
                {`${attributes.description.slice(0, 21)}...`}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
