import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
              <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
                <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border bg-card/80 px-3 backdrop-blur-sm sm:h-14 sm:gap-3 sm:px-4">
                  <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                    <SidebarTrigger className="-ml-1 size-10 min-w-10 touch-manipulation sm:size-9 sm:min-w-0" />
                    <div className="h-4 w-px shrink-0 bg-border" />
                    <span className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
                      Property Management Analytics
                    </span>
                  </div>
                  <div className="shrink-0 touch-manipulation">
                    <ThemeSwitcher />
                  </div>
                </header>
              <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-muted/40 to-background">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
