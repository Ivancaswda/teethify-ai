import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

function NoNextAppointments() {
  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-primary" />
            Ближайший приём
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Нет запланированных приёмов
          </p>

          <Link href="/appointments">
            <Button variant="outline">Записаться</Button>
          </Link>
        </CardContent>
      </Card>
  );
}

export default NoNextAppointments;
