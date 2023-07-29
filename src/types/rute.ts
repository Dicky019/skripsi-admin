import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const taskSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
// });

// export type Task = z.infer<typeof taskSchema>;


export interface IRute {
  locationAwal: {
    id: string;
    lat: string;
    long: string;
  };
  locationAkhir: {
    id: string;
    lat: string;
    long: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  kode: string;
  color: string;
}

