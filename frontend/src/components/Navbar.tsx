import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/driver" className="-m-1.5 p-1.5">
              <h1 className="text-black">Advanced Mobility</h1>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/driver"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Driver
            </Link>
            <Link
              href="/vehicle"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Vehicle
            </Link>
            <Link
              href="/vehicle-transfer"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
             Vehicle Transfer
            </Link>
          </div>
        </nav>
      </header>
  )
}

export default Navbar
