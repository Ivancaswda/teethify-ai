"use client";

import { format, isAfter, isSameDay, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import NoNextAppointments from "./NoNextAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { useState } from "react";

function NextAppointment() {
  const [appointments, setAppointments] = useState<any[]>([]);

  if (!appointments.length) {
    return <NoNextAppointments />;
  }

  const upcomingAppointments = appointments.filter((appointment) => {
    const date = parseISO(appointment.date);
    const today = new Date();
    return (
        (isSameDay(date, today) || isAfter(date, today)) &&
        appointment.status === "CONFIRMED"
    );
  });

  const nextAppointment = upcomingAppointments[0];
  if (!nextAppointment) return <NoNextAppointments />;

  const date = parseISO(nextAppointment.date);

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-primary" />
            Ближайший приём
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <UserIcon className="size-4 text-primary" />
              <div>
                <p className="font-medium">{nextAppointment.doctorName}</p>
                <p className="text-xs text-muted-foreground">
                  {nextAppointment.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarIcon className="size-4 text-primary" />
              <p>
                {format(date, "d MMMM yyyy", { locale: ru })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <ClockIcon className="size-4 text-primary" />
              <p>{nextAppointment.time}</p>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}

export default NextAppointment;
