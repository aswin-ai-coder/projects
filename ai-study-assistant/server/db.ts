import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
const dir=path.join(process.cwd(),"data");fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,"study-ai.sqlite"));db.pragma("foreign_keys = ON");
const schema=fs.readFileSync(path.join(process.cwd(),"server/schema.sql"),"utf8");db.exec(schema);
// Lightweight forward migration for databases created before the richer flashcard schema.
try{db.exec("ALTER TABLE flashcards ADD COLUMN state TEXT NOT NULL DEFAULT 'new'")}catch{}
export default db;
