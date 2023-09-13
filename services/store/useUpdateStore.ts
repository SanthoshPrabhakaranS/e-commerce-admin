"use client";

import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface StoreProps {
  name: string;
}

export const useUpdateStore = (storeId: string) => {
  const router = useRouter();

  return useMutation(
    async (data: StoreProps) => {
      await axios.patch(`/api/stores/${storeId}`, data);
      router.refresh();
    },
    {
      onSuccess: () => {
        toast.success("Store updated!");
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
