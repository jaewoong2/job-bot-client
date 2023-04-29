import React, { PropsWithChildren } from 'react'
import { Button } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'
import { Link, LinkProps } from 'react-router-dom'

type Props = {
  title: string
  imgSrc: string
  to?: string
  buttonName?: string
  imgClassName?: string
} & LinkProps

const Card = ({
  title,
  imgSrc,
  to,
  className,
  children,
  buttonName,
  imgClassName,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <Link
      to={to ?? title}
      className={`flex flex-col border max-w-xs max-h-[350px] h-full aspect-square rounded-xl w-full cursor-pointer shadow-md hover:bg-slate-50 dark:shadow-darkBg-300 dark:bg-darkBg-300 hover:dark:bg-darkBg-400 hover:-translate-y-1 transition-transform ${className}`}
      aria-label={`카드: ${title}`}
      {...rest}
    >
      <figure
        className={`rounded-t-xl w-full flex items-center bg-slate-200 h-auto overflow-hidden ${imgClassName}`}
      >
        <img className="" src={imgSrc} alt={`카드 이미지: ${title}`} />
      </figure>
      <div className="p-3 flex flex-col flex-1 gap-2">
        <h2 className="text-[1.1em] font-semibold">{title}</h2>
        {children}
      </div>
      <div className="w-full flex justify-end p-3">
        <Button className="flex gap-2">
          <span>{buttonName ?? '보러가기'}</span>
          <RxArrowRight />
        </Button>
      </div>
    </Link>
  )
}

export default Card
