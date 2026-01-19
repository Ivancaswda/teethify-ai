import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CrownIcon, LockIcon, MicIcon } from "lucide-react";
import Link from "next/link";

function ProPlanRequired() {
  return (
    <div className="min-h-screen bg-background mt-6">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Access Denied Section */}
        <div className="relative mb-12 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <LockIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Premium Функция</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Требуется доступ к голосовому ассистенту
                  </h1>

                  <p className="text-muted-foreground">
                    Обновите тариф до <b>AI Pro</b> или <b>AI Basic</b>, чтобы получить неограниченные
                    голосовые консультации с AI-стоматологом.
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <MicIcon className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>


        <Card className="relative mt-4 overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 max-w-2xl mx-auto">
          <CardContent className="relative p-8 text-center">
            <div className="w-20 h-20  rounded-2xl flex  items-center justify-center  mb-6 group-hover:scale-110 transition-transform duration-300">
              <LockIcon className="w-30   h-10 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-4">Требуется обновление тарифа</h3>

            <p className="text-muted-foreground mb-6">
              Голосовой ассистент доступен только подписчикам AI Pro и AI Basic.
              Получайте профессиональные стоматологические советы в формате живого диалога.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Круглосуточные голосовые консультации</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Профессиональные рекомендации по лечению</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Советы для быстрого снятия боли</span>
              </div>
            </div>

            <Link href="/pricing">
              <Button>
                <CrownIcon className="mr-2 h-5 w-5" />
                Перейти на Premium
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProPlanRequired;
