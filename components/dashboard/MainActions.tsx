import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {MessageSquareIcon, CalendarIcon, MicIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MainActions() {
  return (
      <div className="grid md:grid-cols-2 gap-8 mb-12">

        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <div  className="w-[60px] p-2 h-[60px] bg-primary/20 rounded-full flex items-center justify-center">
                <MicIcon className='text-primary' />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">AI-ассистент</h3>
                <p className="text-muted-foreground">
                  Мгновенные голосовые консультации
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-sm">
              <li>• Доступен 24/7</li>
              <li>• Профессиональные советы</li>
              <li>• Экстренные рекомендации</li>
            </ul>

            <Link
                href="/voice"
                className={buttonVariants({ className: "w-full mt-6" })}
            >
              <MessageSquareIcon className="mr-2 h-5 w-5" />
              Начать разговор
            </Link>
          </CardContent>
        </Card>

        {/* Запись */}
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">

                <div  className="w-[60px] p-2 h-[60px] bg-primary/20 rounded-full flex items-center justify-center">
                  <CalendarIcon className='text-primary' />
                </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Запись к врачу</h3>
                <p className="text-muted-foreground">
                  Проверенные стоматологи рядом с вами
                </p>
              </div>
            </div>

            <Link href="/appointments">
              <Button variant="outline" className="w-full mt-6">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Записаться
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
  );
}
