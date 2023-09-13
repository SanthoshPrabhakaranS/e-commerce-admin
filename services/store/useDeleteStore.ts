import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useDeleteStore = () => {
  const router = useRouter();

  return useMutation(
    async (storeId: string) => {
      await axios.delete(`/api/stores/${storeId}`);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Store deleted!");
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
