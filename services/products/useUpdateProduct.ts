import { ProductFormValues } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";


export const useUpdateProduct = ({
  storeId,
  productId,
}: {
  storeId: string | string[];
  productId: string | string[];
}) => {
  const router = useRouter();
  return useMutation(
    async (data: ProductFormValues) => {
      await axios.patch(`/api/${storeId}/products/${productId}`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Product updated!");
        router.push(`/${storeId}/products`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
