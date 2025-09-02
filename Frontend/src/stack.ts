import { StackClientApp } from "@stackframe/react";
import { useNavigate } from "react-router-dom";

export const stackClientApp = new StackClientApp({
  // You should store these in environment variables
  projectId: "d61186d9-ae3d-46d4-8aa2-3fc93d80e2cd",
  publishableClientKey: "pck_qpqg8ztjvryn7zxyqtqkx1ng0hev6weprbz4bja2zyp4g",
  tokenStore: "cookie",
  redirectMethod: {
    useNavigate,
  }
});