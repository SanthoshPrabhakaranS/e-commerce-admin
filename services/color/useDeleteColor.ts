import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export const useDeleteColor = ({
  storeId,
  colorId,
}: {
  storeId: string | string[];
  colorId: string | string[];
}) => {
  const router = useRouter();

  return useMutation(
    async () => {
      await axios.delete(`/api/${storeId}/colors/${colorId}`);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Color deleted!");
        router.push(`/${storeId}/colors`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
