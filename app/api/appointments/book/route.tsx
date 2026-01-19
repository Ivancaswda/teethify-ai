import { NextRequest, NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import {appointmentsTable, doctorsTable} from "@/configs/schema";
import {format} from "date-fns";
import {sendAppointmentEmail} from "@/lib/mailer";
import {ru} from "date-fns/locale";
import {and, eq} from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { doctorId, date, time, reason, isPremium, isBasic } = await req.json();

        if (!doctorId || !date || !time) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        const upcomingAppointments = await db
            .select()
            .from(appointmentsTable)
            .where(and(
                eq(appointmentsTable.status, "ПОДТВЕРЖДЕНО"),
                eq(appointmentsTable.userEmail, user.email)
            )  )
        console.log('upcomingAppointments===')
        console.log(upcomingAppointments)
        if (isBasic == 0 && isPremium == 0 && upcomingAppointments.length >= 3) {
            return NextResponse.json(
                { error: "Вы достигли лимита 3 приёмов для бесплатного пользователя!" },
                { status: 403 }
            );
        }

        const [appointment] = await db
            .insert(appointmentsTable)
            .values({
                userEmail: user.email,
                doctorId,
                date: new Date(date),
                time,
                reason: reason ?? "Главная консультация",
                status: "ПОДТВЕРЖДЕНО",
            })
            .returning();
        const result = await db.select().from(doctorsTable)
            .where(eq(doctorsTable.id, doctorId))


        let emailSent = true;

        try {
            await sendAppointmentEmail({
                to: appointment.userEmail,
                doctorName: result[0].name,
                date: format(new Date(appointment.date), "d MMMM yyyy", { locale: ru }),
                time: appointment.time,
                reason: appointment.reason,
            });
        } catch (emailError: any) {
            emailSent = false;

            console.error("EMAIL ERROR:", emailError?.code, emailError?.message);
        }

        return NextResponse.json({ appointment, doctorName: result[0].name,  emailSent });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
    }
}
