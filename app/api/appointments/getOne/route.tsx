import { NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import { appointmentsTable, usersTable, doctorsTable } from "@/configs/schema";
import { and, asc, eq } from "drizzle-orm";

export async function GET() {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const appointments = await db
            .select()
            .from(appointmentsTable)
            .where(eq(appointmentsTable.userEmail, user.email))
            .orderBy(asc(appointmentsTable.date), asc(appointmentsTable.time));

        return NextResponse.json({ appointments });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch user appointments" }, { status: 500 });
    }
}
