"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BrainIcon, MessageSquareIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";

function DentalHealthOverview() {
  const [appointmentStats, setAppointmentStats] = useState<any>({
    completedAppointments: 0,
    totalAppointments: 0,
  });

  const { user } = useAuth();

  const memberSince =
      user?.createAt &&
      format(parseISO(user.createdAt), "LLLL yyyy", { locale: ru });

  return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainIcon className="size-5 text-primary" />
            Ваша стоматологическая история
          </CardTitle>
          <CardDescription>
            Отслеживайте своё стоматологическое здоровье
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">
                {appointmentStats.completedAppointments}
              </div>
              <div className="text-sm text-muted-foreground">
                Завершённых визитов
              </div>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">
                {appointmentStats.totalAppointments}
              </div>
              <div className="text-sm text-muted-foreground">
                Всего записей
              </div>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">
                {memberSince ?? "—"}
              </div>
              <div className="text-sm text-muted-foreground">
                Пользователь с
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquareIcon className="size-5 text-primary" />
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-1">
                  Готовы начать?
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Запишитесь на приём или получите мгновенную консультацию от AI-ассистента.
                </p>

                <div className="flex gap-2">
                  <Link href="/voice">
                    <Button size="sm">
                      AI-ассистент
                    </Button>
                  </Link>

                  <Link href="/appointments">
                    <Button size="sm" variant="outline">
                      Записаться
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}

export default DentalHealthOverview;
