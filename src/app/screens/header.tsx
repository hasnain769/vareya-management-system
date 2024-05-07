import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import logo from "@/app/assets/vareyaLogo.png"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-100 text-black">
            <div className="flex space-x-4">
              <Image src={logo} alt="vareyaBV" width={50} height={40}></Image>
              <h1 className="text-xl font-semibold pt-4"></h1>
              {/* <Select>
                <SelectTrigger id="order-summaries">
                  <SelectValue>Order Summaries</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="recently-viewed">Recently Viewed</SelectItem>
                </SelectContent>
              </Select> */}
            <div className="pt-7 text-slate-600 font-large" >
              <nav className="flex space-x-6">
                <ol className="  hover:bg-slate-200 focus:bg-slate-200 cursor-pointer" >Fulfillments</ol>
                <ol className="   hover:bg-slate-200 focus:bg-slate-200 cursor-pointer">Addresses</ol>
                <ol className="   hover:bg-slate-200 focus:bg-slate-200 cursor-pointer"><Link href="/payments">Payments</Link></ol>
                <ol className="   hover:bg-slate-200 focus:bg-slate-200 cursor-pointer">Accounts</ol>
                <ol className="   hover:bg-slate-200 focus:bg-slate-200 cursor-pointer">Support</ol>
                
              </nav>
            </div>
            </div>
            <div className="flex space-x-2 pt-4">
              <div>
              <Input className="w-48 " placeholder="Search..." type="search" />
              </div>
              <SettingsIcon className="text-gray-600 dark:text-gray-300" />
              {/* <HelpCircleIcon className="text-gray-600 dark:text-gray-300" /> */}
              <SignalIcon className="text-gray-600 dark:text-gray-300" />
              {/* <Avatar>
                <AvatarImage alt="User avatar" src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar> */}
              {/* <Toggle aria-label="Toggle night mode">
                <MoonIcon className="h-7 w-7 text-gray-600 dark:text-gray-300 pb-2" />
              </Toggle> */}
            </div>
          </div>
  )
}

function MenuIcon(props : any) {
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
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function MoonIcon(props : any) {
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
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    )
  }
  
  
  function SettingsIcon(props : any) {
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
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  
  
  function SignalIcon(props : any) {
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
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
        <path d="M12 20v-8" />
        <path d="M17 20V8" />
        <path d="M22 4v16" />
      </svg>
    )
  }
  