import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface SizeProps {
  name: string;
  value: string;
}

export const useUpdateSize = ({
  storeId,
  sizeId,
}: {
  storeId: string | string[];
  sizeId: string | string[];
}) => {
  const router = useRouter();
  return useMutation(
    async (data: SizeProps) => {
      await axios.patch(`/api/${storeId}/sizes/${sizeId}`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Size updated!");
        router.push(`/${storeId}/sizes`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
