import { Filter } from "../src/lib/filter";
import { createClient } from "@libsql/client";

export const config = {
  runtime: "edge", // This makes the function run fast on Vercel's edge network
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    // 1. Sanitize all inputs (The "filter_var" equivalent)
    const cleanData = {
      first_name: Filter.text(body.first_name, 100),
      last_name: Filter.text(body.last_name, 100),
      email: Filter.email(body.email),
      phone: Filter.phone(body.phone), // Uses the numeric-only filter
      subject: Filter.text(body.subject, 50),
      message: Filter.text(body.message, 255),
      newsletter: Filter.int(body.newsletter)
    };
    // 2. Final Server-Side Validation Check
    // We check this again in case the sanitization made a field empty
    if (!cleanData.first_name || !cleanData.last_name || !cleanData.email || cleanData.message.length < 10) {
      return new Response(JSON.stringify({ error: "Invalid or incomplete data" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    // These variables are automatically provided by the Vercel + Turso integration
    const db = createClient({
      url: process.env.windup_TURSO_DATABASE_URL!,
      authToken: process.env.windup_TURSO_AUTH_TOKEN!,
    });
    // 3. Use cleanData in your SQL execution
    await db.execute({
      sql: `INSERT INTO contacts (first_name, last_name, email, phone, subject, message, newsletter) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        cleanData.first_name,
        cleanData.last_name,
        cleanData.email,
        cleanData.phone || null, // Ensure empty string becomes NULL in SQL
        cleanData.subject,
        cleanData.message,
        cleanData.newsletter
      ],
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Failed to save message" }), { status: 500 });
  }
}