"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/fsw-donalds");
  }, []);

  return (
    <main>
      <div>Hello world!</div>
    </main>
  );
}
