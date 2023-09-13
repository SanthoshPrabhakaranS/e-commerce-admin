import { ProductFormValues } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useCreateProduct = (id: string | string[]) => {
  const router = useRouter();
  return useMutation(
    async (data: ProductFormValues) => {
      await axios.post(`/api/${id}/products`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Product created!");
        router.push(`/${id}/products`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
