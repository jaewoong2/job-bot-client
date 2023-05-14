import React, { PropsWithChildren } from 'react'
import { Button } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'
import Link, { LinkProps } from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  imgSrc: string
  buttonName?: string
  imgClassName?: string
  className?: string
} & LinkProps

const Card = ({
  title,
  imgSrc,
  href,
  className,
  children,
  buttonName,
  imgClassName,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <Link
      href={href ?? title}
      className={`flex aspect-square h-full max-h-[350px] w-full max-w-xs cursor-pointer flex-col rounded-xl border shadow-md transition-transform hover:-translate-y-1 hover:bg-slate-50 dark:bg-darkBg-300 dark:shadow-darkBg-300 hover:dark:bg-darkBg-400 ${className}`}
      aria-label={`카드: ${title}`}
      {...rest}
    >
      <figure
        className={`flex h-[150px] w-auto items-center overflow-hidden rounded-t-xl bg-slate-200 ${imgClassName}`}
      >
        <Image className='' src={imgSrc} alt={`카드 이미지: ${title}`} />
      </figure>
      <div className='flex flex-1 flex-col gap-2 p-3'>
        <h2 className='text-ellipsis text-[1.1em] font-semibold'>{title}</h2>
      </div>
      {children}
      <div className='flex w-full justify-end p-3'>
        <Button className='flex gap-2'>
          <span>{buttonName ?? '보러가기'}</span>
          <RxArrowRight />
        </Button>
      </div>
    </Link>
  )
}

export default Card
