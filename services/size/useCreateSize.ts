import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface SizeProps {
  name: string;
  value: string;
}

export const useCreateSize = (id: string | string[]) => {
  const router = useRouter();
  return useMutation(
    async (data: SizeProps) => {
      await axios.post(`/api/${id}/sizes`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Size created!");
        router.push(`/${id}/sizes`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
