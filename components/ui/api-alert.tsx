"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied!");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex flex-row gap-3 items-center">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex flex-row justify-between items-center">
        <code className="py-[.2rem] px-[.3rem] bg-muted font-mono relative rounded font-semibold">
          {description}
        </code>
        <Button onClick={onCopy} variant={"outline"} size={"icon"}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
