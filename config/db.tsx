import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Vérifier que l'URL de la base de données est bien définie
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

// Connexion à PostgreSQL via Neon
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql,{schema});
