"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MicIcon, CalendarIcon, StarIcon } from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/context/useAuth";

function Hero() {
  const {user} = useAuth()
  return (
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-primary/5" />

        <div style={{gap: '250px'}} className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2  items-center">
          {/* LEFT */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
              AI-ассистент для здоровья зубов
            </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Ответы на <span className="text-primary">стоматологические</span><br />
              вопросы — мгновенно
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Teethify помогает понять симптомы, подобрать лечение и записаться
              к проверенным стоматологам — 24/7.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link href={user ? '/dashboard' : '/sign-up'}>
                <Button size="lg">
                  <MicIcon className="mr-2" /> Голосовой AI
                </Button>
              </Link>
              <Link href={user ? '/voice' : '/sign-up'}>
                <Button size="lg" variant="outline">
                  <CalendarIcon className="mr-2" /> Записаться
                </Button>
              </Link>
            </div>

            {/* SOCIAL PROOF */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[
                    "https://thispersonnotexist.org/static/img/Random_female_face_1.jpeg",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcI7poEX1elHUW4ZIiJvuJDe-67OQEB83Ueg&s",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9QGBgpsEkbxZpgU-8AEElsXL-wk1kJECNBA&s",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv8wIwWxj1xwXhS4L10N1LE0baLAkPtUbpBQ&s",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4doqqpcVao4xHXIq5sHCzYbh7-twfrr9eg&s"

                ].map((item, i) => (
                    <img
                        key={i}
                        src={item}
                        alt="Пользователь"
              style={{width: '40px', height: '40px'}}
                        className="rounded-full ring-4 ring-background"
                    />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                      <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-semibold">4.8</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  1 200+ довольных пациентов
                </p>
              </div>
            </div>
          </div>


          <div className="relative ml-8">
            <Image
                src={'/hero2.png'}
                alt="Teethify AI"
                width={600}
                height={600}
                className="w-full  h-auto"
                priority
            />
          </div>
        </div>
      </section>
  );
}

export default Hero;
