import Image from "next/image"
import { JSX, SVGProps } from "react"
import VareyaLogo from '../../public/VareyaLogo.png'


export function TopNav() {
  return (
    <nav className="bg-white shadow">
      <div className="w-full mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex text-center  justify-between h-16">
    
            <Image
                alt="SmartBytes Logo"
                className="h-auto w-auto -ml-40 "
                src={VareyaLogo}
                
              />
            <div className="hidden sm:-my-px  sm:ml-0 sm:flex sm:space-x-8 lg:ml-2">
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/"
              >
                Dashboard
              </a>
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/"
              >
                Order Summaries
              </a>
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/"
              >
                Items

              </a>
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/"
              >
                Customers
              </a>
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/"
                
              >
                Addresses
              </a>
             
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/payments"
              >
                Payments

              </a>
              <a
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium"
                href="/"
              >
                Shipping
              </a>
            </div>
          
          <div className="hidden mr-10 sm:ml-6 sm:flex sm:items-center ">
            <button
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
            >
              <SearchIcon className="h-6 w-6" />
            </button>
            <input
              className="ml-2 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}



function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
