"use client";

import dynamic from "next/dynamic";

export default dynamic(async () => import("./App"), { ssr: false });
