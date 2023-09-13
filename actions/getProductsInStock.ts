import prismadb from "@/lib/prismadb";

export const getProductsInStock = async (storeId: string) => {
  const productsInStock = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return productsInStock.length;
};
