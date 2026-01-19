import { NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import { appointmentsTable } from "@/configs/schema";
import {and, eq, sql} from "drizzle-orm";

export async function GET() {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const total = await db
            .select()
            .from(appointmentsTable)
            .where(eq(appointmentsTable.userEmail, user.email));

        const completed = await db
            .select()
            .from(appointmentsTable)
            .where(
                and(
                    eq(appointmentsTable.userEmail, user.email),
                    eq(appointmentsTable.status, "ЗАВЕРШЕНО")
                )
            );

        return NextResponse.json({
            totalAppointments: total,
            completedAppointments: completed,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
