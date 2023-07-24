'use client'
import Image from 'next/image'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Menu, MoonIcon, SunIcon, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSideBarStore } from '@/lib/store'
import { PageWrapper } from '@/app/page-wrapper'


const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {setShowSideBar, showSideBar} = useSideBarStore();

  const handleMenuBarClick = () => {

    setIsSidebarOpen(!isSidebarOpen);
  };



  useEffect(() => {
    setMounted(true)
  }, [])



  const renderThemeChanger = () => {

    if (!mounted) return null;
    const curentTheme = theme === "system" ? systemTheme : theme;

    if (curentTheme === 'dark') {
      return (
        <SunIcon className='w-7 h-7 opacity-7 ' role='button' onClick={() => setTheme('light')} />
      )
    }
    else {
      return (
        <MoonIcon className='w-7 h-7 opacity-6' role='button' onClick={() => setTheme('dark')} />

      )
    }
  }

  return (

    <header className='w-full flex justify-start pl-10 gap-5 items-center h-16 shadow-md  dark:border-gray-700  table-fixed bg-fixed top-0 left-0 right-0'>
      <Button size="icon" variant="ghost" className='h-8 w-8' onClick={() => setShowSideBar(!showSideBar)} >
          <Menu className='h-[1rem] w-[1rem]' />
        </Button>

      <Image src="/logo_light.png" alt='company-logo' height={45} width={149} />

      {renderThemeChanger()}


    </header>

  )
}

export default Header