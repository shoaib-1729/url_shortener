import { Link, useNavigate } from "react-router-dom";
import Logo from "../../public/logo.jpeg";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/authApi";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  // user aur fetch user function ki value lelo store se
  const { user, fetchUser } = UrlState();
  console.log(user);
  // run logout logic using useFetch custom hook
  const { loading, fn: fnLogout } = useFetch(logout);
  return (
    <div>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} className="h-16 mix-blend-screen" alt="trimmr-logo" />
        </Link>

        <div>
          {/* if user is not logged in then show him login button. otherwise show him dropdown menu (imported from shadcn ui) */}
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                {/* avatar component */}
                <Avatar>
                  <AvatarImage
                    src={
                      user?.user_metadata?.profile_pic || "default-avatar.png"
                    }
                    className="object-contain"
                  />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name || "Unknown User"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      // logout the user and navigate to home page
                      fnLogout().then(() => {
                        //  fetch the user, to show the image while logout
                        fetchUser();
                        // navigate to home page
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {/* jab user logout ho raha tab ye loader dikhao. */}
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </div>
  );
};

export default Header;
