import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

interface ColorProps {
  name: string;
  value: string;
}

export const useCreateColor = (id: string | string[]) => {
  const router = useRouter();
  return useMutation(
    async (data: ColorProps) => {
      await axios.post(`/api/${id}/colors`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Color created!");
        router.push(`/${id}/colors`);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
