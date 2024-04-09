"use client"
import React from "react";
import MainHeader from "./MainHeader";
import MainLayout from "./MainLayout";
import { SessionProvider } from "next-auth/react";

export default function KingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SessionProvider>
        <MainHeader />
        <main className="flex-1 flex-row bg-white">
          <MainLayout> {children} </MainLayout>
        </main>
      </SessionProvider>
    </div>
  );
}
