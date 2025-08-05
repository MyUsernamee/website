import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MyWebsite",
    description: "MyUsername's (Delano Leslie's) Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // TODO: Make nav_holder links more generic.
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex justify-between bg-ctp-crust p-3 pr-8 pl-8">
                    <a className="flex justify-start no-underline" href="/">
                        <img src="icon.png" className="h-8" /> 
                        <div className="text-lg text-white align-middle inline-block no-underline"> 
                            | MyUsername
                        </div>
                    </a>
                    <div className="nav_holder">
                        <a href="/about"> About </a> 
                        <a href="/blog"> Blog </a> 
                        <a href="/contact"> Contact </a> 
                        <a href="/daily_question"> Daily Math Question </a> 
                    </div>
                </div>
                <div className="flex justify-center">
                <div className="content">
                    {children}
                </div>
                </div>
            </body>
        </html>
    );
}
