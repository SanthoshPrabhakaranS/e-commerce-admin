import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getProductsInStock } from "@/actions/getProductsInStock";
import { getTotalRevenue } from "@/actions/getRevenue";
import { getTotalSales } from "@/actions/getTotalSales";
import Overview from "@/components/Overview";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);
  const productsInStock = await getProductsInStock(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          {/* Total Revenue */}
          <div className="p-6 space-y-2 border shadow-sm rounded-md">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-sm">Total Revenue</p>
              <span className="font-semibold text-muted-foreground">$</span>
            </div>
            {/* Body */}
            <h1 className="font-bold text-2xl">
              {formatter.format(totalRevenue)}
            </h1>
          </div>

          {/* Total Sales */}
          <div className="p-6 space-y-2 border shadow-sm rounded-md">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-sm">Sales</p>
              <CreditCard size={20} className="text-muted-foreground" />
            </div>
            {/* Body */}
            <h1 className="font-bold text-2xl">+{totalSales}</h1>
          </div>

          {/* Total Products */}
          <div className="p-6 space-y-2 border shadow-sm rounded-md">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
              <p className="font-medium text-sm">Products In Stock</p>
              <Package size={20} className="text-muted-foreground" />
            </div>
            {/* Body */}
            <h1 className="font-bold text-2xl">{productsInStock}</h1>
          </div>
        </div>
        {/* Bar Chart */}
        <div className="border rounded-md shadow-sm p-6 space-y-3">
          <h1 className="font-semibold text-2xl">Overview</h1>
          <Overview data={graphData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
