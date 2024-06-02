"use client"
import { Sheet,SheetContent,SheetTrigger,} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"


  
  const MobileNav = () => {
    const pathname = usePathname();
    return (
      <header className="header">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image
              src="/assets/images/logo-text.svg"
              alt="logo"
              width={180}
              height={28}
          />
        </Link>

        <nav className="flex gap-2">
            {/* only renders when signed in  */}
            <SignedIn>
                <UserButton afterSignOutUrl="/" />

                <Sheet>
                    <SheetTrigger>
                        <Image
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            width={32}
                            height={32}
                            className="cursor-pointer"
                            ></Image>
                    </SheetTrigger>
                    <SheetContent className="sheet-content sm:w-64">
                        <>
                            <Image
                                src="/assets/images/logo-text.svg"
                                alt="logo"
                                width={152}
                                height={23}
                                
                            />

                    <ul className="header-nav_elements">
                    {/* Map over our nav items coming from constants
                        Inorder to make the list we slice the list to only display the items we want at the top */}
                    {navLinks.map((link) => {
                        const isActive = link.route === pathname
                        
                        {/* Rendering links */}
                        return (    
                        // if the buttons is active it will have some color else gray
                            <li 
                                className={`${isActive &&
                                'gradient-text'} p-18 flex
                                whitespace-nowrap text-dark-700`}
                                key={link.route} 
                                >
                                {/* We can then point somewhere by clicking on the link  */}
                                <Link className="sidebar-link cursor-pointer" href={link.route}>
                                <Image 
                                    src={link.icon}
                                    alt="logo"
                                    width={24}
                                    height={24}
                                />
                                {link.label}
                                </Link>
                        </li>
                        )
                    })}
                    {/* We close the ul right here to separate the unordered list in two parts */}
                    </ul>

                        </>
                    </SheetContent>
                </Sheet>
            </SignedIn>
            <SignedOut>
                    {/* asChild property to be rendered as a link */}
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in"></Link>
                    </Button>
                    
                </SignedOut>
        </nav>
      </header>
    )
  }
  
  export default MobileNav
  