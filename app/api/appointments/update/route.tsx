// api/doctors/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import {appointmentsTable, doctorsTable} from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        const { id, status } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "APPOINTMENT_ID_MISSING" }, { status: 400 });
        }

        await db
            .update(appointmentsTable)
            .set({
                status: status,
               })
            .where(eq(appointmentsTable.id, id));

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "UPDATE_DOCTOR_FAILED" },
            { status: 500 }
        );
    }
}
