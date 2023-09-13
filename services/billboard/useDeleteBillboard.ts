import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useDeleteBillboard = ({
  storeId,
  billboardId,
}: {
  storeId: string | string[];
  billboardId: string | string[];
}) => {
  const router = useRouter();

  return useMutation(
    async () => {
      await axios.delete(`/api/${storeId}/billboards/${billboardId}`);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Billboard deleted!");
        router.push(`/${storeId}/billboards`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
