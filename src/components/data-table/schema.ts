import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
    title: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.enum(["Male", "Female", "Other"]),
    date: z.number(),
    age: z.string(),
    referralCode: z.string(),
    referralCount: z.string(),
    aadhaarCard: z.string(),
    aadhaarNumber: z.string(),
    voterCard: z.string(),
    voterId: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;