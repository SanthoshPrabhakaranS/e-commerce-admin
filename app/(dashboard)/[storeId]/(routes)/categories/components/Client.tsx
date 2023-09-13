"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoriesColumns, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
  items: CategoriesColumns[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();  

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Categories (${items?.length})`}
          description="Manage Categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-1" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={items} />
      <Separator />
      <Heading title="API" description="API calls for Categories" />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoryClient;
