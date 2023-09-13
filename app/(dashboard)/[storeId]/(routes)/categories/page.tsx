import React from "react";
import prismadb from "@/lib/prismadb";
import { CategoriesColumns } from "./components/Columns";
import { format } from "date-fns";
import CategoryClient from "./components/Client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  // Create the formatted categories array including billboard data
  const formattedCategories: CategoriesColumns[] = categories.map(
    (category) => {
      return {
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMMM do, yyyy"),
      };
    }
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient items={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
