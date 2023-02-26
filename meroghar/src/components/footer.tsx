'use client'

import Link from 'next/link'
import Image from 'next/legacy/image'
import { Search } from './svgs'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 flex w-full justify-around border-2 border-gray-200 p-3 md:hidden">
      <FooterChild
        url="http://localhost:3000"
        img="/search.png"
        text="Search"
      />
      <FooterChild
        url="http://localhost:3000"
        img="/search.png"
        text="Search"
      />
      <FooterChild
        url="http://localhost:3000"
        img="/search.png"
        text="Search"
      />
      <FooterChild
        url="http://localhost:3000"
        img="/search.png"
        text="Search"
      />
      <FooterChild
        url="http://localhost:3000"
        img="/search.png"
        text="Search"
      />
    </footer>
  )
}

interface footerprops {
  url: string
  img: string
  text: string
}

function FooterChild({ url, img, text }: footerprops) {
  return (
    <Link href={url} className=" flex  flex-col gap-2 text-xs">
        <Search className='w-5 h-5 fill-gray-100 stroke-3' />

      <span>{text}</span>
    </Link>
  )
}
