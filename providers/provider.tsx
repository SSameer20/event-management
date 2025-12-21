import { ReactNode } from "react";
import QueryProvider from "./query";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
