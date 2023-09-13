import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface BillboardProps {
  label: string;
  imageUrl: string;
}

export const useUpdateBillboard = ({
  storeId,
  billboardId,
}: {
  storeId: string | string[];
  billboardId: string | string[];
}) => {
  const router = useRouter();
  return useMutation(
    async (data: BillboardProps) => {
      await axios.patch(`/api/${storeId}/billboards/${billboardId}`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Billboard updated!");
        router.push(`/${storeId}/billboards`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
