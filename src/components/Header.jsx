import { Link, useNavigate } from "react-router-dom"
import Logo from "../../public/logo.jpeg"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from "lucide-react"


const Header = () => {
    const navigate = useNavigate()
    const user = true;
    return(
        <nav className="py-4 flex justify-between items-center">
            <Link to="/" >
                <img src={Logo} className="h-16 mix-blend-screen" alt="trimmr-logo" />
             </Link>

             <div>
                {/* if user is not logged in then show him login button. otherwise show him dropdown menu (imported from shadcn ui) */}
                {(!user) ?
                    <Button onClick={() => navigate("/auth")}>Login</Button>
                    : (
                        <DropdownMenu>
                        <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                            {/* avatar component */}
                            <Avatar>
                                   <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>SA</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Shoaib Akhtar</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LinkIcon className="mr-2 h-4 w-4"/>
                            My Links
                        </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400">
                            <LogOut className="mr-2 h-4 w-4" />
                             <span>Logout</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                    )
                }
             </div>

            
        </nav>
    )
}

export default Header