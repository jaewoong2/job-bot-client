import React from 'react'
import { FcPositiveDynamic, FcTodoList, FcGraduationCap, FcSms } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const HOME_NAVIGATION = [
  {
    icon: <FcGraduationCap />,
    content: '지원서 작성',
    href: '/write',
  },
  {
    icon: <FcPositiveDynamic />,
    content: '지원서 평가',
    href: '/pnf',
  },
  {
    icon: <FcTodoList />,
    content: '지원서 피드백',
    href: '/feedback',
  },
  {
    icon: '🐝',
    content: '코파일럿',
    href: '/copilot',
  },
  {
    icon: <FcSms />,
    content: '지원서 꿀팁',
    href: '/articles',
  },
]

const Home = () => {
  return (
    <section className="flex flex-col gap-10 w-full items-center">
      <div>
        <div className="flex justify-center h-[200px] w-full max-sm:sr-only">
          <img src="/jobbotthubmnail.png" alt="잡봇 로고" className="drop-shadow-lg" />
        </div>
        <div className="relative sm:sr-only text-4xl p-3 w-24 h-24 flex justify-center items-center rounded-3xl shadow-xl dark:shadow-darkBg-200 dark:shadow-inner">
          <h1 className="dark:text-slate-400 flex justify-center items-center text-black font-thin">
            잡봇
          </h1>
        </div>
      </div>
      <div className="text-2xl font-bold mx-auto max-xl:text-xl">이용 가능한 컨텐츠</div>
      <div className="grid max-w-md gap-5 grid-cols-4 max-sm:grid-cols-4 max-md:grid-cols-3 max-[320px]:grid-cols-3 justify-center p-5">
        {HOME_NAVIGATION.map(({ content, icon, href }) => (
          <Link
            className="w-fit cursor-pointer justify-center flex flex-col gap-2 hover:-translate-y-1 transition-transform"
            to={href}
            key={href}
          >
            <div className="rounded-xl shadow-xl dark:shadow-inner w-[80px] h-[80px] flex justify-center items-center dark:shadow-darkBg-200">
              <span className="text-3xl">{icon}</span>
            </div>
            <div className="text-sm justify-center flex items-center">{content}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Home
