import React from 'react'
import { RxGithubLogo } from 'react-icons/rx'

const Footer = () => {
  return (
    <footer className="w-full dark:bg-darkBg-500 min-h-[200px] bg-slate-50 border-t">
      <div aria-label="footer-main" className="container max-w-6xl mx-auto p-5 dark:text-gray-300">
        <div className="w-full grid grid-cols-3">
          <div className="border-r">
            <h2 className="font-bold text-xl">Contact</h2>
            <ul>
              <li className="text-sm  py-1 ">
                <a href="mailto: jwisgenius@naver.com">Send Email</a>
              </li>
              <li className="text-sm dark:text-white py-1">
                <a href="https://github.com/jaewoong2" className="flex items-center gap-2">
                  <RxGithubLogo />
                  <span>@jaewoong2</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-sm font-semibold">@All Rights Reserved @jaewoong2</p>
      </div>
    </footer>
  )
}

export default Footer
;<a href="mailto: abc@example.com">Send Email</a>
