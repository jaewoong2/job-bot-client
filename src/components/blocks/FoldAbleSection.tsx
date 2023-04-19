import React, { PropsWithChildren } from 'react'
import { FcExpand } from 'react-icons/fc'
import useFoldAbleActions from '@/hooks/useFoldAbleActions'
import useFoldAbleValue from '@/hooks/useFoldAbleValue'
import FoldAbleContext from '../contexts/FoldAbleContext'

type Props = {
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const Section = ({ title, children, ...props }: Props) => {
  const { fold, isFold } = useFoldAbleValue()
  const { toggle } = useFoldAbleActions()

  return (
    <section {...props}>
      <button
        type="button"
        className="ml-4 px-2 rounded-xl w-fit flex items-center gap-2 hover:bg-slate-100"
        onClick={toggle}
      >
        <FcExpand className={fold ? '-animate-rotate-90 -rotate-90' : 'animate-rotate-0'} />
        <div className="p-1 rounded-xl text-gray-800 ">
          <h2>{title}</h2>
        </div>
      </button>
      <div
        className={fold ? `animate-fade-out-up ${isFold ? 'hidden' : ''}` : 'animate-fade-in-down'}
      >
        {children}
      </div>
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
