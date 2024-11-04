import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryProvider } from "@/components/common/QueryProvider";
import ModalController from "@/components/common/modal/ModalController";
import PageSizeController from "@/components/common/PageSizeController";


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
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Suspense fallback={<div>Loading...</div>}>
                {children}
              </Suspense>
            </ErrorBoundary>
          </PageSizeController>
        </QueryProvider>
      </body>
    </html>
  );
}
