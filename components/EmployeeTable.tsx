'use client'

import { useQuery } from "@tanstack/react-query";
import TableLoading from "./TableLoading";
import { DataTable } from "./employee-table/Datatable";
import { useEmployeesStatus, useOrder, useSortBy, useCurrentPage, useRowsPerPage } from "@/lib/store";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageWrapper } from "@/app/page-wrapper";


type Employee = {
  id: string
  name : string
  email : string
  department : string
  designation : string
  status : "Active" | "Inactive"
}


async function fetchEmployeeData(status: string, sortBy:string, order : string, page:number, limit:number): Promise<Employee[]> {
  const url = status==="all" ? `http://localhost:3000/employeeData?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}` : `http://localhost:3000/employeeData?status=${status}&_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}`
  const response = await axios.get(url);
  console.log(response)
  return response.data;
}

export default function EmployeeTable() {
  const {sortBy, setSortBy} = useSortBy()
  const {order, setOrder} = useOrder()
  const {currentPage} = useCurrentPage()
  const {rowsPerPage} = useRowsPerPage()
  
  const updateSorting = (column : string) => {
    if(sortBy === column){
      if(order === "desc"){
        setOrder("asc")
      }else{
        setOrder("desc")
      }
    }
    else{
      setSortBy(column)
      setOrder("asc")   
    }
  }

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => updateSorting("id")}>
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => updateSorting("name")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => updateSorting("email")}>
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "department",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => updateSorting("department")}>
            Department
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "designation",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => updateSorting("designation")}>
            Designation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => updateSorting("status")}>
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
   
  const { employeesStatus } = useEmployeesStatus();
  
  console.log(employeesStatus)
  const { data:employeeData, isLoading } = useQuery<Employee[]>({
    queryKey: ["employee-query", "emp1", employeesStatus, sortBy, order, currentPage, rowsPerPage],
    queryFn: () => fetchEmployeeData(employeesStatus, sortBy, order, currentPage, rowsPerPage),
  });

  return (
  <PageWrapper>
    <div className="mx-auto min-w-full">
      <DataTable columns={columns} data={employeeData ?? []} isLoading={isLoading}/>
    </div>
    </PageWrapper>
  );
}
