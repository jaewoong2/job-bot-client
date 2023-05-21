import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import ThemeButton from './ThemeButton'
import { useColorMode } from '@chakra-ui/react'
import LeftSide from './LeftSide'
import { usePathname } from 'next/navigation'
import { IMAGES } from '@/constants'
import Router from 'next/router'

const useMenu = () => {
  const [isMenuClick, setIsMenuClick] = useState(false)

  const showMenuClick = useCallback(() => {
    setIsMenuClick(true)
  }, [])

  const hideMenuClick = useCallback(() => {
    setIsMenuClick(false)
  }, [])

  const toggleMenuClick = useCallback(() => {
    setIsMenuClick((prev) => !prev)
  }, [])

  const handleMenuBoxClick = useCallback(
    (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        hideMenuClick()
      }
    },
    [hideMenuClick]
  )

  return {
    isMenuClick,
    showMenuClick,
    hideMenuClick,
    toggleMenuClick,
    handleMenuBoxClick,
  }
}

type Props = {
  title?: string
  toggleMenuClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

type MobileMenuProps = {
  temperature: number
  setTemperature: React.Dispatch<React.SetStateAction<number>>
}

const MobileMenu = ({
  isMenuClick,
  handleMenuBoxClick,
  hideMenuClick,
  showMenuClick,
  temperature,
  setTemperature,
}: ReturnType<typeof useMenu> & MobileMenuProps) => {
  const pathname = usePathname()

  if (pathname === '/') return null
  if (!isMenuClick) return null

  return (
    <div
      tabIndex={0}
      role='menu'
      onTouchEnd={handleMenuBoxClick}
      onKeyDown={() => {
        return true
      }}
      className='fixed left-0 top-12 z-50 flex h-full w-full animate-fade-in-down bg-transparent lg:hidden'
      onClick={handleMenuBoxClick}
    >
      <div className='h-fit w-full rounded-b-md bg-white p-3 pb-6 shadow-lg dark:bg-darkBg-400'>
        <div className='flex w-full flex-col items-end gap-5 '>
          <button className='text-xl' type='button' onClick={hideMenuClick || showMenuClick}>
            &times;
          </button>
          <LeftSide isOnMenuBox temperature={temperature} setTemperature={setTemperature} />
        </div>
        <div className='flex w-full flex-col items-end gap-5 pt-3'>
          <button
            className='text-md flex items-center rounded-md bg-slate-200 px-4 py-2 align-middle hover:bg-slate-300 dark:bg-darkBg-200 hover:dark:bg-darkBg-100'
            type='button'
            onClick={hideMenuClick || showMenuClick}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

const Header = ({ title, className, children, temperature, setTemperature, ...props }: Props & MobileMenuProps) => {
  const menu = useMenu()
  const { colorMode, setColorMode } = useColorMode()
  const pathname = usePathname()

  if (!Router.isReady) {
    return null
  }

  return (
    <>
      <header
        className={
          'fixed top-0 z-50 flex h-12 w-full items-center justify-between border-b bg-white bg-opacity-40 px-3 backdrop-blur-sm dark:border-gray-500 dark:bg-darkBg-400 ' +
          className
        }
        {...props}
      >
        {/* LINK 로 바꿔야함 */}
        <Link href='/' className='rounded-lg p-2'>
          <div className='flex items-center gap-3'>
            <img width={24} height={24} src={IMAGES.small.favicon} alt='잡봇 logo' />
            <h1 className='rounded-md p-1 pb-1 font-bold hover:bg-slate-100 dark:hover:bg-darkBg-200'>{title}</h1>
          </div>
        </Link>
        <div className='flex items-center gap-4'>
          {pathname !== '/' && (
            <button aria-label='메뉴 버튼' type='button' className='flex lg:hidden' onClick={menu.toggleMenuClick}>
              <RxHamburgerMenu className='w-4 stroke-[1px] text-gray-300' />
            </button>
          )}
          <ThemeButton {...{ colorMode, setColorMode }} />
        </div>
        {children}
      </header>
      <MobileMenu {...{ ...menu, temperature, setTemperature }} />
    </>
  )
}

export default Header
