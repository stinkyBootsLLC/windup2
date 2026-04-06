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
    const { first_name, last_name, email, phone, subject, message, newsletter } = body;

    // These variables are automatically provided by the Vercel + Turso integration
    const db = createClient({
      url: process.env.windup_TURSO_DATABASE_URL!,
      authToken: process.env.windup_TURSO_AUTH_TOKEN!,
    });

    await db.execute({
      sql: `INSERT INTO contacts (first_name, last_name, email, phone, subject, message, newsletter) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [first_name, last_name, email, phone, subject, message, newsletter],
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