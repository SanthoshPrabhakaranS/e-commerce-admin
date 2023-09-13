"use client";

import React from "react";
import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateStore } from "@/services/store/useCreateStore";

const formSchema = z.object({
  name: z.string().min(1, "Required!"),
});

const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isLoading } = useCreateStore();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
    storeModal.onClose();
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      onClose={storeModal.onClose}
      isOpen={storeModal.isOpen}
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 flex flex-row gap-2 justify-end">
                <Button onClick={storeModal.onClose} variant={"outline"}>
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
