import { createClient } from "@libsql/client";
import { Filter } from "../src/lib/filter";

export const config = {
    runtime: "edge",
};

export default async function handler(req: Request) {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    try {
        const formData = await req.formData();

        // 1. Text Fields
        const first_name = Filter.text(formData.get("first_name") as string, 100);
        const last_name = Filter.text(formData.get("last_name") as string, 100);
        const stage_name = Filter.text(formData.get("stage_name") as string, 100);
        const email = Filter.email(formData.get("email") as string);
        const city = Filter.text(formData.get("city") as string, 100);
        const state = Filter.text(formData.get("state") as string, 100);
        const phone = Filter.phone(formData.get("phone") as string);
        const about_self = Filter.bio(formData.get("about_self") as string);
        const goals = Filter.bio(formData.get("goals") as string);
        const portfolio_links = Filter.links(formData.get("portfolio_links") as string);
        const disciplines = JSON.stringify(formData.getAll("disciplines"));

        // 2. File Processing (Edge Compatible)
        const headshotFile = formData.get("headshot") as File;
        const resumeFile = formData.get("resume") as File;

        const toBase64 = async (file: File) => {
            if (!file || file.size === 0) return null;

            const arrayBuffer = await file.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);

            // Use a loop to build the string in chunks to avoid stack overflow
            let binary = "";
            const len = bytes.byteLength;
            const chunk_size = 8192; // Process 8kb at a time

            for (let i = 0; i < len; i += chunk_size) {
                binary += String.fromCharCode.apply(
                    null,
                    //@ts-ignore - subArray is safe here
                    bytes.subarray(i, i + chunk_size)
                );
            }

            return btoa(binary);
        };

        const headshotBase64 = await toBase64(headshotFile);
        const resumeBase64 = await toBase64(resumeFile);

        // 3. Database Insertion
        const db = createClient({
            url: process.env.windup_TURSO_DATABASE_URL!,
            authToken: process.env.windup_TURSO_AUTH_TOKEN!,
        });

        await db.execute({
            sql: `INSERT INTO talent (
        first_name, last_name, stage_name, email, city, state, 
        phone, about_self, goals, portfolio_links, disciplines, 
        headshot_blob, resume_blob
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
                first_name, last_name, stage_name, email, city, state,
                phone, about_self, goals, portfolio_links, disciplines,
                headshotBase64, // Turso will store this string as the BLOB
                resumeBase64
            ],
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        // This will help you see the EXACT error in your browser console/Vercel logs
        console.error("Talent API Error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}