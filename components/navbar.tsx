'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/products', label: '产品展示' },
    { href: '/about', label: '关于我们' },
    { href: '/contact', label: '联系我们' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-primary/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="苏鑫五金家具"
                width={48}
                height={48}
                className="object-contain w-12 h-12 hover:opacity-80 transition-opacity duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-medium tracking-wide text-foreground">
                苏鑫五金家具
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-primary/80 uppercase">
                SUXIN FURNITURE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
                </span>
              </Link>
            ))}
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Button 
              asChild 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Link href="/contact">
                预约咨询
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 w-6 h-px bg-current transition-all duration-300 ${isOpen ? 'top-3 rotate-45' : 'top-1.5'}`} />
              <span className={`absolute left-0 top-3 w-6 h-px bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-6 h-px bg-current transition-all duration-300 ${isOpen ? 'top-3 -rotate-45' : 'top-[18px]'}`} />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-8 border-t border-primary/20">
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-4"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-8 h-px bg-primary/30" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                <Button 
                  asChild 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    预约咨询
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
