import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface CategoryProps {
    name: string;
    billboardId: string;
}

export const useUpdateCategory = ({
  storeId,
  categoryId,
}: {
  storeId: string | string[];
  categoryId: string | string[];
}) => {
  const router = useRouter();
  return useMutation(
    async (data: CategoryProps) => {
      await axios.patch(`/api/${storeId}/categories/${categoryId}`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Category updated!");
        router.push(`/${storeId}/categories`)
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
