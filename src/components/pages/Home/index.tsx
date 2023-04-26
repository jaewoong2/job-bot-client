import Card from '@/components/atoms/Card'
import React from 'react'
import { FcComments } from 'react-icons/fc'
import { RxDividerVertical } from 'react-icons/rx'
import articles from '@/articles'

const Home = () => {
  return (
    <section className="flex flex-col gap-10">
      {/* <div className="px-6 flex flex-col gap-5">
        <div className="p-3 w-full flex items-center gap-1 dark:bg-darkBg-300 dark:border-gray-500 border rounded-xl">
          <FcSearch />
          <RxDividerVertical />
          <h2>바로가기</h2>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <Card
            title="ChatGPT가 도와주는 지원서"
            imgSrc="/thumbnail1.png"
            to="/write"
            buttonName="확인"
          />
          <Card
            title="ChatGPT의 피드백 받으러가기"
            imgSrc="/thumbnail2.png"
            to="/feedback"
            buttonName="확인"
          />
        </div>
      </div> */}
      <div className="px-6 flex flex-col gap-5">
        <div className="p-3 w-full flex items-center gap-1 dark:bg-darkBg-300 dark:border-gray-500 border rounded-xl">
          <FcComments />
          <RxDividerVertical />
          <h2>꿀팁</h2>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {articles.articles.map(({ attributes }) => (
            <Card
              key={attributes.title}
              title={attributes.title}
              imgSrc={attributes.img}
              to={`/articles/${encodeURIComponent(attributes.title)}`}
            >
              {attributes.description}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
