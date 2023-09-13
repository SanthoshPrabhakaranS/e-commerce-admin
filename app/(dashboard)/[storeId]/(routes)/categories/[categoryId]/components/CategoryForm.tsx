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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/useOrigin";
import { useCreateCategory } from "@/services/category/useCreateCategory";
import { useDeleteCategory } from "@/services/category/useDeleteCategory";
import { useUpdateCategory } from "@/services/category/useUpdateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const formSchema = z.object({
  name: z.string().min(1, "Required!"),
  billboardId: z.string().min(1, "Required!"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const origin = useOrigin();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  //Creating a new category
  const { mutate: _createCategory, isLoading: isCreateLoading } =
    useCreateCategory(params.storeId);

  //Updating a category
  const { mutate: _updateCategory, isLoading: isUpdateLoading } =
    useUpdateCategory({
      storeId: params.storeId,
      categoryId: params.categoryId,
    });

  //Deleting a category
  const { mutate: _deleteCategory } = useDeleteCategory({
    storeId: params.storeId,
    categoryId: params.categoryId,
  });

  const onSubmit = async (data: CategoryFormValues) => {
    if (initialData) {
      _updateCategory(data);
    } else {
      _createCategory(data);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={_deleteCategory}
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreateLoading || isUpdateLoading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isCreateLoading || isUpdateLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                        <SelectContent>
                          <SelectGroup>
                            {billboards?.map((billboard) => {
                              return (
                                <SelectItem
                                  key={billboard.id}
                                  value={billboard.id}
                                >
                                  {billboard.label}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
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

export default CategoryForm;
