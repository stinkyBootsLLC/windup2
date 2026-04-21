import { createClient } from "@libsql/client";
import { sanitize } from "../src/lib/util"; // Using the sanitize function you provided

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const formData = await req.formData();
    
    /**
     * Backend Filtering & Sanitization
     * We wrap every string input in sanitize() to strip HTML tags 
     * and prevent XSS/Injection attempts.
     */
    const first_name = sanitize(formData.get("first_name") as string);
    const last_name = sanitize(formData.get("last_name") as string);
    const age = parseInt(formData.get("dancer_age") as string, 10);
    const email = sanitize(formData.get("email") as string).toLowerCase();
    const registration_type = sanitize(formData.get("registrationType") as string);
    const studio_name = formData.get("studio_name") ? sanitize(formData.get("studio_name") as string) : null;
    const pole_training = sanitize(formData.get("pole_training") as string);
    const can_invert = sanitize(formData.get("canInvert") as string);
    const emergency_contact = sanitize(formData.get("emergency_contact") as string);
    
    // Checkboxes are mapped, sanitized, then stringified for the BLOB/TEXT column
    const rawOptions = formData.getAll("purchaseOptions") as string[];
    const purchase_options = JSON.stringify(rawOptions.map(opt => sanitize(opt)));

    // Basic Backend Guard: Ensure critical data isn't empty after sanitization
    if (!first_name || !last_name || !email) {
      return new Response(JSON.stringify({ error: "Required fields missing after sanitization." }), { status: 400 });
    }

    const db = createClient({
      url: process.env.windup_TURSO_DATABASE_URL!,
      authToken: process.env.windup_TURSO_AUTH_TOKEN!,
    });

    await db.execute({
      sql: `INSERT INTO event_registration (
        first_name, last_name, age, email, registration_type, 
        studio_name, pole_training, can_invert, emergency_contact, 
        purchase_options
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        first_name, 
        last_name, 
        age, 
        email, 
        registration_type, 
        studio_name, 
        pole_training, 
        can_invert, 
        emergency_contact, 
        purchase_options
      ],
    });

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Internal Server Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}