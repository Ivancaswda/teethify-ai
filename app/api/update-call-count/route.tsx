import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import getServerUser from "@/lib/auth-server";

export async function POST(req: NextRequest) {

        const user =await getServerUser();

    const { aiCallCount  } = await req.json();

    await db.update(usersTable)
        .set({ aiCallCount })
        .where(eq(usersTable.email, user?.email));

    return NextResponse.json({ success: true });
}
