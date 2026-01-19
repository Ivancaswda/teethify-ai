"use client";


import {CalendarIcon, CrownIcon, HomeIcon, LogOutIcon, MailIcon, MicIcon, UserCheckIcon, UserIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/context/useAuth";
import {GiToothbrush} from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useEffect} from "react";
import {LoaderOne} from "@/components/ui/loader";
import {BiDesktop} from "react-icons/bi";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const router =useRouter()
  const pathname = usePathname();
  console.log(user)
  useEffect(() => {
    if (!user && !loading) {
      router.push('/sign-up')
    }
  }, [user, loading, router]);

  if (!user && loading) {
    return <div className="flex mt-6 items-center justify-center w-screen h-screen">
      <LoaderOne/>
    </div>
  }


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">

        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
           <GiToothbrush className='size-8 text-primary cursor-pointer'/>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 transition-colors ${
                pathname === "/dashboard"
                  ? "text-foreground hover:text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden md:inline">Панель управления</span>
            </Link>

            <Link
              href="/appointments"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/appointments" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">Приемы</span>
            </Link>

            <Link
              href="/voice"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/voice" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <MicIcon className="w-4 h-4" />
              <span className="hidden md:inline">AI Teethify</span>
            </Link>
            <Link
              href="/pricing"
              className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                pathname === "/pricing" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <CrownIcon className="w-4 h-4" />
              <span className="hidden md:inline">Premium</span>
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.userName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-primary text-white font-semibold">
                    {user?.userName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl p-2 shadow-xl"
              >
                {/* USER INFO */}
                <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2">
                  <UserIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{user?.userName}</span>

                </DropdownMenuLabel>
                <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2">
                  <MailIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{user?.email}</span>

                </DropdownMenuLabel>





                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center gap-2 rounded-lg cursor-pointer hover:bg-primary/10"
                    onClick={() => router.push("/dashboard")}
                >
                  <BiDesktop className="w-4 h-4 " />
                  <span>Панель управления</span>
                </DropdownMenuItem>



                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center gap-2 rounded-lg cursor-pointer hover:bg-primary/10"
                    onClick={() => router.push("/pricing")}
                >
                  <CrownIcon className="w-4 h-4 text-primary" />
                  <span>Сменить тариф</span>
                </DropdownMenuItem>


                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center gap-2 rounded-lg cursor-pointer hover:bg-primary/10"
                    onClick={() => router.push("/admin")}
                >
                  <UserCheckIcon className="w-4 h-4 " />
                  <span>Для администраторов</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />


                {/* LOGOUT */}
                <DropdownMenuItem
                    className="flex items-center gap-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-500/10"
                    onClick={logout}
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
