import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { appointmentsTable } from "@/configs/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const doctorId = searchParams.get("doctorId");
        const date = searchParams.get("date");

        if (!doctorId || !date) {
            return NextResponse.json({ error: "Missing params" }, { status: 400 });
        }

        const slots = await db
            .select({ time: appointmentsTable.time })
            .from(appointmentsTable)
            .where(
                and(
                    eq(appointmentsTable.doctorId, doctorId),
                    eq(appointmentsTable.date, new Date(date)),
                    inArray(appointmentsTable.status, ["ПОДТВЕРЖДЕНО", "ЗАВЕРШЕНО"])
                )
            );

        return NextResponse.json({ bookedSlots: slots.map(s => s.time) });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch slots" }, { status: 500 });
    }
}
