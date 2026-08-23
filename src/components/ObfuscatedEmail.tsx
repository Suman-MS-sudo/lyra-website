"use client";

import { useEffect, useState } from "react";

const USER = "sales";
const DOMAIN = "lyraenterprise.co.in";

export default function ObfuscatedEmail({
  className,
  subject,
  body,
  children,
}: {
  className?: string;
  subject?: string;
  body?: string;
  children?: React.ReactNode;
}) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(`${USER}@${DOMAIN}`);
  }, []);

  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();

  if (!address) {
    return <span className={className}>{children ?? "Email us"}</span>;
  }

  return (
    <a href={`mailto:${address}${query ? `?${query}` : ""}`} className={className}>
      {children ?? address}
    </a>
  );
}
