"use client";

import React, { useState } from "react";
import { ColorsColumns } from "./Columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useDeleteSize } from "@/services/size/useDeleteSize";
import AlertModal from "@/components/modals/alert-modal";
import { useDeleteColor } from "@/services/color/useDeleteColor";

interface CellActionProps {
  data: ColorsColumns;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const { mutate, isLoading } = useDeleteColor({
    storeId: params.storeId,
    colorId: data?.id,
  });

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Color ID copied to clipboard!");
  };

  const onUpdate = (id: string) => {
    router.push(`/${params.storeId}/colors/${id}`);
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={open}
        onConfirm={mutate}
        onClose={() => setOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => onCopy(data?.id)}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdate(data?.id)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
