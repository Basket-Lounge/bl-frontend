import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { QueryProvider } from "@/components/common/QueryProvider";
import ModalController from "@/components/common/modal/ModalController";
import PageSizeController from "@/components/common/PageSizeController";
import { ErrorBoundaryHandler } from "@/components/common/ErrorBoundaryHandler";
import SpinnerLoading from "@/components/common/SpinnerLoading";


const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  title: "Basket Lounge",
  description: "NBA를 좋아하는 사람들을 위한 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.className} antialiased bg-color2 w-full`}
      >
        <QueryProvider>
          <PageSizeController>
            <ModalController />
            <ErrorBoundaryHandler>
              <Suspense fallback={(
                <SpinnerLoading />
              )}>
                {children}
              </Suspense>
            </ErrorBoundaryHandler>
          </PageSizeController>
        </QueryProvider>
      </body>
    </html>
  );
}
