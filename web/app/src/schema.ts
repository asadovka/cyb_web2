import {schema} from "normalizr";

export const candidatesSchema = new schema.Entity('candidates');
export const candidatesListSchema = new schema.Array(candidatesSchema);

export const contactsSchema = new schema.Entity('contacts');
