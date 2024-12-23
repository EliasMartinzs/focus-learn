"use client";
import { getUser } from "@/features/user/api/get-user";

export default function Dashboard() {
  const { data } = getUser();

  console.log(data);
  return <>dasdasdasda</>;
}
