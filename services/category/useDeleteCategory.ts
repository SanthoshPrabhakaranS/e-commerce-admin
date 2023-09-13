import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useDeleteCategory = ({
    storeId,
    categoryId,
  }: {
    storeId: string | string[];
    categoryId: string | string[];
  }) => {
  const router = useRouter();

  return useMutation(
    async () => {
      await axios.delete(`/api/${storeId}/categories/${categoryId}`);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Category deleted!");
        router.push(`/${storeId}/categories`)
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
