"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrdersColumns, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  items: OrdersColumns[];
}

const BillboardClient: React.FC<OrderClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Orders (${items?.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={items} />
    </>
  );
};

export default BillboardClient;
