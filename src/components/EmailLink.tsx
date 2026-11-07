"use client";

import { useEffect, useState } from "react";

/** 邮箱混淆渲染：运行时 join 防爬虫直接抓取静态 HTML 明文 */
export default function EmailLink({ parts }: { parts: string[] }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(parts.join(""));
  }, [parts]);

  if (!email) {
    return <span aria-hidden="true">…</span>;
  }
  return <span>{email}</span>;
}
