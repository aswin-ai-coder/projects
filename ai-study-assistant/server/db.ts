import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
const dir=path.join(process.cwd(),"data");fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,"study-ai.sqlite"));db.pragma("foreign_keys = ON");
const schema=fs.readFileSync(path.join(process.cwd(),"server/schema.sql"),"utf8");db.exec(schema);
for(const sql of [
  "ALTER TABLE flashcards ADD COLUMN state TEXT NOT NULL DEFAULT 'new'",
]){try{db.exec(sql)}catch{}}
db.exec(`CREATE TABLE IF NOT EXISTS user_progress (user_id TEXT PRIMARY KEY, xp INTEGER NOT NULL DEFAULT 0, level INTEGER NOT NULL DEFAULT 1, longest_streak INTEGER NOT NULL DEFAULT 0, last_reward_date TEXT, weekly_reward_date TEXT, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`);
export default db;
