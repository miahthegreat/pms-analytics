import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PMS Analytics | Property Management Data & Forecasting",
  description: "Property management system analytics: properties, units, revenue, expenses, YoY/YTD comparisons, and forecasting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${geistMono.variable} h-svh overflow-hidden antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider className="h-svh min-h-0 overflow-hidden">
              <AppSidebar />
              <SidebarInset className="min-h-0">
                <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-4 w-px bg-border" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Property Management Analytics
                    </span>
                  </div>
                  <ThemeSwitcher />
                </header>
              <main className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-muted/40 to-background">
                <ScrollArea className="h-full min-h-0 flex-1">
                  <div className="p-4 md:p-6">
                    {children}
                  </div>
                </ScrollArea>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
