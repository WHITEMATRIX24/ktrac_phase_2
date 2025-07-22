import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatBot from "@/components/chatBot";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full ml-[0px] mt-[0px]">
        <Header />
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
}
