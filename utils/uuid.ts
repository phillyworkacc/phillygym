import { v4 } from "uuid";
import crypto from "crypto";

export function generateId (prefix?: string) {
   return prefix ? `${prefix}${v4()}` : v4();
}

export function hashedPassword (pwd: string) {
   return crypto.createHash('sha1').update(pwd).digest('hex');
}