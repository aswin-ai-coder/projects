import { KEYS, read, write } from "./domain";
const keys=Object.values(KEYS);
export function exportBackup(){const data:Record<string,unknown>={version:1,exportedAt:new Date().toISOString()};for(const key of keys)data[key]=read(key,null);return JSON.stringify(data,null,2)}
export function importBackup(raw:string){const data=JSON.parse(raw) as Record<string,unknown>;for(const key of keys)if(key in data)write(key,data[key]);return true}
