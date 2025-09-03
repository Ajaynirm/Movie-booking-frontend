import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'
import { useAtom, useSetAtom } from "jotai";
import {  userAtom, setUserAtom } from "@/store/showStore";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

export function DropdownMenuDemo() {
  const [user] = useAtom(userAtom);
  const setUser=useSetAtom(setUserAtom);

  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile
          <DropdownMenuShortcut><SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{router.push("/")}}>
            Home
            <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={()=>{router.push("/shows")}}>Show</DropdownMenuItem>
          <DropdownMenuItem disabled>
            Movie
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            Theatre
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

     
        <DropdownMenuGroup>
          <DropdownMenuItem  disabled={!user}

            onClick={() => {
              router.push("/booking");
            }}

          >
            View Ticket
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {user ? 
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault(); // stop Radix from closing prematurely
            try {
              await signOut();
              setUser(null);
              Cookies.set("auth_token", "");
              toast.success("Logout successfully");
              setTimeout(() => router.push("/"), 500);
            } catch (err) {
              toast.error("Logout Failed");
            }
          }}
          className="text-red-500  cursor-pointer"
        >
          Log out
        </DropdownMenuItem>

          : <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault(); // stop Radix from closing prematurely
            try {
              router.push("/auth/sign-in"); 
            } catch (err) {
              toast.error("Redirect Failed");
            }
          }}
          className="text-green-500  cursor-pointer"
        >
          Sign In
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
