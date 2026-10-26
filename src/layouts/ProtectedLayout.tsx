import { AppSidebar } from "@/components/app-sidebar";
import HeaderTitle from "@/components/HeaderTitle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Loading from "@/lib/Loading";
import { useLoginCheck } from "@/query/users/getUserMe";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { data, isLoading, error } = useLoginCheck({ enabled: true });

  if (isLoading) {
    return <Loading hScreen={true} />;
  }

  if (error) {
    return (
      <Navigate
        to={`/signin?errMsg=${error?.message || "Unauthorized"}`}
        replace
      />
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <HeaderTitle />
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
        <div className="h-96" />
      </SidebarInset>
    </SidebarProvider>
  );
}
