"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrdersColumns = {
  id: string;
  products: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<OrdersColumns>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
