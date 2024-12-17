import { AppSidebar } from "@/components/app-sidebar";
import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

// Fetch data function
async function getData() {
  const response = await fetch("https://api.bppindia.com:8443/api/v1/members/all");
  const data = await response.json();
  return data;
}

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the data when component mounts
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Member Details</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Members</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content Section */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          <div className="overflow-x-auto max-w-full">
            <DataTable data={data} columns={columns} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
