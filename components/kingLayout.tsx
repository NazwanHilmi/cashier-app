"use client"
import React from "react";
import MainHeader from "./MainHeader";
import { SessionProvider } from "next-auth/react";
import Header from "./header";
import HeaderMobile from "./header-mobile";
import MarginWidthWrapper from "./margin-width-wrapper";
import PageWrapper from "./page-wrapper";
import SideNav from "./side-nav";

export default function KingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex">
        <SideNav />
        <main className="flex-1 flex-row bg-white">
          <MarginWidthWrapper>
            <Header />
            <HeaderMobile />
            <PageWrapper>
              {children}
            </PageWrapper>
          </MarginWidthWrapper>
        </main>
      </div>
    </SessionProvider>
  );
}
