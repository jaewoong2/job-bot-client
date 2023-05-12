'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import { FcExpand } from 'react-icons/fc'
import useFoldAbleActions from '@/hooks/useFoldAbleActions'
import useFoldAbleValue from '@/hooks/useFoldAbleValue'
import FoldAbleContext from '../contexts/FoldAbleContext'

type Props = {
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const Section = ({ title, children, ...props }: Props) => {
  const { fold, isFold } = useFoldAbleValue()
  const { toggle, show } = useFoldAbleActions()

  useEffect(() => {
    show()
  }, [show])

  return (
    <section {...props}>
      <button
        type='button'
        className='ml-4 flex w-fit items-center gap-2 rounded-xl px-2 hover:bg-slate-100 dark:hover:bg-darkBg-300'
        onClick={toggle}
      >
        <FcExpand className={fold ? '-animate-rotate-90 -rotate-90' : 'animate-rotate-0'} />
        <div className='rounded-xl p-1 text-gray-800  dark:text-white'>
          <h2 className='text-[1.05em]'>{title}</h2>
        </div>
      </button>
      <div className={fold ? `animate-fade-out-up ${isFold ? 'hidden' : ''}` : 'animate-fade-in-down'}>{children}</div>
    </section>
  )
}

const FoldAbleSection = ({ children, ...rest }: PropsWithChildren<Props>) => {
  return (
    <FoldAbleContext>
      <Section {...rest}>{children}</Section>
    </FoldAbleContext>
  )
}

export default FoldAbleSection
