"use client";

import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface StoreProps {
  name: string;
}

export const useCreateStore = () => {
  return useMutation(
    async (values: StoreProps) => {
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    },
    {
      onSuccess: () => {
        toast.success("Store created!");
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );
};
