import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface BillboardProps {
  label: string;
  imageUrl: string;
}

export const useCreateBillboard = (id: string | string[]) => {
  const router = useRouter();
  return useMutation(
    async (data: BillboardProps) => {
      await axios.post(`/api/${id}/billboards`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Billboard created!");
        router.push(`/${id}/billboards`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
