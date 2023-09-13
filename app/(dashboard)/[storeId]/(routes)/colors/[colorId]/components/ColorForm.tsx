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
import { useCreateColor } from "@/services/color/useCreateColor";
import { useDeleteColor } from "@/services/color/useDeleteColor";
import { useUpdateColor } from "@/services/color/useUpdateColor";
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

interface ColorFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Required!"),
  value: z.string().min(1).regex(/^#/, {
    message: "Must be a valid hex color!",
  }),
});

type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const params = useParams();

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit color" : "Add a new color";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { mutate: _createColor, isLoading: isCreateLoading } = useCreateColor(
    params.storeId
  );

  const { mutate: _updateColor, isLoading: isUpdateLoading } = useUpdateColor({
    storeId: params.storeId,
    colorId: params.colorId,
  });

  const { mutate: _deleteColor } = useDeleteColor({
    storeId: params.storeId,
    colorId: params.colorId,
  });

  const onSubmit = async (data: ColorFormValues) => {
    if (initialData) {
      _updateColor(data);
    } else {
      _createColor(data);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={_deleteColor}
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
                      placeholder="Color name"
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
                    <div className="flex flex-row gap-3 items-center">
                      <Input
                        disabled={isCreateLoading || isUpdateLoading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      ></div>
                    </div>
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

export default ColorForm;
