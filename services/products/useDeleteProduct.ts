import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useDeleteProduct = ({
  storeId,
  productId,
}: {
  storeId: string | string[];
  productId: string | string[];
}) => {
  const router = useRouter();

  return useMutation(
    async () => {
      await axios.delete(`/api/${storeId}/products/${productId}`);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Product deleted!");
        router.push(`/${storeId}/products`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
