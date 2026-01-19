import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Clock } from "lucide-react";

interface Props {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

export default function AdminStats({
                                     totalDoctors,
                                     activeDoctors,
                                     totalAppointments,
                                     completedAppointments,
                                   }: Props) {
  return (
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={Users} value={totalDoctors} label="Всего врачей" />
        <StatCard icon={UserCheck} value={activeDoctors} label="Активные врачи" />
        <StatCard icon={Calendar} value={totalAppointments} label="Всего записей" />
        <StatCard icon={Clock} value={completedAppointments} label="Завершённые" />
      </div>
  );
}

function StatCard({ icon: Icon, value, label }: any) {
  return (
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        </CardContent>
      </Card>
  );
}
