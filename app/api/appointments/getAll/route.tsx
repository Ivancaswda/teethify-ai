import { NextRequest, NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import { appointmentsTable, doctorsTable, usersTable } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const result = await db
            .select({
                id: appointmentsTable.id,
                date: appointmentsTable.date,
                time: appointmentsTable.time,
                status: appointmentsTable.status,
                reason: appointmentsTable.reason,

                patientName: usersTable.userName,
                patientEmail: usersTable.email,

                doctorName: doctorsTable.name,
                doctorEmail: doctorsTable.email,
                doctorImageUrl: doctorsTable.imageUrl,
            })
            .from(appointmentsTable)
            .leftJoin(usersTable, eq(usersTable.email, appointmentsTable.userEmail))
            .leftJoin(doctorsTable, eq(doctorsTable.id, appointmentsTable.doctorId))
            .orderBy(desc(appointmentsTable.createdAt));

        return NextResponse.json({ appointments: result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
