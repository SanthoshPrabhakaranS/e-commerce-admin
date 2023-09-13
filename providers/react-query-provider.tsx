"use client";

import React, { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const ReactQueryProider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProider;
