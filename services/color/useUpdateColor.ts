import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface ColorProps {
  name: string;
  value: string;
}

export const useUpdateColor = ({
  storeId,
  colorId,
}: {
  storeId: string | string[];
  colorId: string | string[];
}) => {
  const router = useRouter();
  return useMutation(
    async (data: ColorProps) => {
      await axios.patch(`/api/${storeId}/colors/${colorId}`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Color updated!");
        router.push(`/${storeId}/colors`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
