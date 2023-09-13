"use client";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCreateBillboard } from "@/services/billboard/useCreateBillboard";
import { useDeleteBillboard } from "@/services/billboard/useDeleteBillboard";
import { useUpdateBillboard } from "@/services/billboard/useUpdateBillboard";
import { useCreateSize } from "@/services/size/useCreateSize";
import { useDeleteSize } from "@/services/size/useDeleteSize";
import { useUpdateSize } from "@/services/size/useUpdateSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Required!"),
  value: z.string().min(1, "Required!"),
});

type SizeFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const params = useParams();

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit size" : "Add a new size";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { mutate: _createSize, isLoading: isCreateLoading } = useCreateSize(
    params.storeId
  );

  const { mutate: _updateSize, isLoading: isUpdateLoading } = useUpdateSize({
    storeId: params.storeId,
    sizeId: params.sizeId,
  });

  const { mutate: _deleteSize } = useDeleteSize({
    storeId: params.storeId,
    sizeId: params.sizeId,
  });

  const onSubmit = async (data: SizeFormValues) => {
    if (initialData) {
      _updateSize(data);
    } else {
      _createSize(data);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={_deleteSize}
        isLoading={false}
      />
      <div className="flex flex-row justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            onClick={() => setOpen(true)}
            size={"icon"}
            variant={"destructive"}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateLoading || isUpdateLoading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateLoading || isUpdateLoading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isCreateLoading || isUpdateLoading} type="submit">
            {action}
          </Button>
        </form>
        <Separator />
      </Form>
    </>
  );
};

export default BillboardForm;
