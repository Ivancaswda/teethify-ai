import { db } from "@/configs/db";
import { appointmentsTable } from "@/configs/schema";
import { and, eq, lt } from "drizzle-orm";

export async function DELETE() {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

    await db.delete(appointmentsTable).where(
        and(
            eq(appointmentsTable.status, "ЗАВЕРШЕНО"),
            lt(appointmentsTable.date, twoHoursAgo)
        )
    );

    return Response.json({ ok: true });
}
