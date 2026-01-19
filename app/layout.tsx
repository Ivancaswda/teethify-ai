import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/context/AuthProvider";
import Footer from "@/components/landing/Footer";
import React from "react";
import Header from "@/components/landing/Header";
import {Toaster} from "@/components/ui/sonner";
import {GoogleOAuthProvider} from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teethify",
  description: "Быстрые приемы и ваш ИИ-Помощний при зубной боли!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!} >
          <AuthProvider>
              <Toaster/>
              {children}
              <Footer />
          </AuthProvider>
      </GoogleOAuthProvider>


      </body>
    </html>
  );
}
