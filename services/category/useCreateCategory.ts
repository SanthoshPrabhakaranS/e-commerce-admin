import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface CategoryProps {
    name: string;
    billboardId: string;
}

export const useCreateCategory = (id: string | string[]) => {
  const router = useRouter();
  return useMutation(
    async (data: CategoryProps) => {
      await axios.post(`/api/${id}/categories`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Category created!");
        router.push(`/${id}/categories`)
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
