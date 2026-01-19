"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {GiToothbrush} from "react-icons/gi";
import {FaGoogle, FaTooth} from "react-icons/fa";
import {PiToothBold} from "react-icons/pi";
import {LiaToothSolid} from "react-icons/lia";
import {useAuth} from "@/context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {CrownIcon, Loader2Icon, LogOutIcon, MailIcon, UserCheckIcon, UserIcon} from "lucide-react";
import {BiDesktop} from "react-icons/bi";
import {useRouter} from "next/navigation";
function Header() {
  const {user, logout, loading}  =useAuth()
  const router = useRouter()
  return (
      <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GiToothbrush size={40} className='text-primary'/>
            <span className="font-bold text-lg">Teethify</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="hover:text-primary" href="#how">Как работает</a>
            <a className="hover:text-primary" href="#pricing">Тарифы</a>
            <a className="hover:text-primary" href="#faq">Вопросы</a>
          </div>


          {!user && !loading ? (
                  <div className="flex gap-2">
                    <Link href="/sign-in">
                      <Button variant="ghost" size="sm">Войти</Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button size="sm">Начать</Button>
                    </Link>
                  </div>

          )  : user && !loading ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {user.userName?.[0]?.toUpperCase()}
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
                    <span className="font-medium">{user.userName}</span>

                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="flex items-center gap-2 px-2 py-2">
                    <MailIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{user.email}</span>

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
          ) : <div>
            <Loader2Icon className='animate-spin text-primary'/>
          </div>}

        </div>
      </nav>
  );
}
export default Header;
