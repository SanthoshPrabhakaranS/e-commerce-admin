import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useDeleteSize = ({
  storeId,
  sizeId,
}: {
  storeId: string | string[];
  sizeId: string | string[];
}) => {
  const router = useRouter();

  return useMutation(
    async () => {
      await axios.delete(`/api/${storeId}/sizes/${sizeId}`);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Size deleted!");
        router.push(`/${storeId}/sizes`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
