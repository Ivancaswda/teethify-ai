import {
    pgTable,
    date,
    uuid,
    text,
    json,
    timestamp,
    varchar,
    integer,
    boolean,
    pgEnum,
    unique
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    avatarUrl: varchar(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    isPremium: integer().default(0),
    isBasic: integer().default(0),
    stripeCustomerId: varchar(),
    aiCallCount: integer().default(0),
});
export const genderEnum = pgEnum("gender", ["MALE", "FEMALE"]);
export const appointmentStatusEnum = pgEnum(
    "appointment_status",
    ["ПОДТВЕРЖДЕНО", "ЗАВЕРШЕНО"]
);
export const doctorsTable = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 50 }).notNull(),
    speciality: varchar("speciality", { length: 255 }).notNull(),
    bio: text("bio"),
    imageUrl: varchar("image_url", { length: 500 }).notNull(),

    gender: genderEnum("gender").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    rating: integer("rating"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});
export const doctorRatingsTable = pgTable(
    "doctor_ratings",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        doctorId: uuid("doctor_id")
            .notNull()
            .references(() => doctorsTable.id, { onDelete: "cascade" }),

        userEmail: varchar("user_email")
            .notNull()
            .references(() => usersTable.email, { onDelete: "cascade" }),

        rating: integer("rating").notNull(), // 1–5

        createdAt: timestamp("created_at").defaultNow().notNull(),
    }

);

export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),

    date: timestamp("date").notNull(),
    time: varchar("time", { length: 10 }).notNull(), // "14:30"
    duration: integer("duration").default(30).notNull(),

    status: appointmentStatusEnum("status")
        .default("ПОДТВЕРЖДЕНО")
        .notNull(),

    notes: text("notes"),
    reason: text("reason"),

    userEmail: varchar()
        .notNull()
        .references(() => usersTable.email, { onDelete: "cascade" }),

    doctorId: uuid("doctor_id")
        .notNull()
        .references(() => doctorsTable.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});