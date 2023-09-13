import prismadb from "@/lib/prismadb";

export const getTotalSales = async (storeId: string) => {
  const selledProducts = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return selledProducts.length
};
