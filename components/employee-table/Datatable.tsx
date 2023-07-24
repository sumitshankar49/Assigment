"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  SortingState,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Suspense, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useCurrentPage, useRowsPerPage } from "@/lib/store"
import { ChevronLeftIcon, ChevronRightIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react"
import LoadingSkeleton from "../LoadingSkelecton"
import TableLoading from "../TableLoading"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading : boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination : true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  const [activeSearchCategory, setActiveSearchCategory] = useState("email")
  const searchCategories = ["id", "email", "name", "department", "designation", "status"]
  const  {currentPage, setCurrentPage} =useCurrentPage();
  const {rowsPerPage, setRowsPerPage} = useRowsPerPage()
  const totalPageCount = Math.ceil(1000/rowsPerPage)
  
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="w-full max-h-[50vh] mx-auto">
      <div className="flex items-center py-4 w-full mx-auto">
        <div className="flex items-center">
          <Input  
            placeholder= {`Search...`}
            value={(table.getColumn(activeSearchCategory)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn(activeSearchCategory)?.setFilterValue(event.target.value)
              //setSearchInput(event.target.value)
            }}
            className="max-w-sm"
          />
          <div className="ml-1">
            <Select onValueChange={(field) => setActiveSearchCategory(field)}>
                <SelectTrigger className="w-[120px] capitalize">
                  <SelectValue placeholder="Search by"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {searchCategories
                      .map((column) => {
                        return(
                          <SelectItem
                            key={column}
                            value={column}
                            className="capitalize"
                          >
                            {column}
                          </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {  
                
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border max-h-[calc(100vh-250px)] overflow-auto mx-auto">
        <Table className="w-full">
          <TableHeader className="w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="w-full">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          
          {isLoading ? <TableLoading /> :
          (
            <TableBody className="w-full">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-4 w-full"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id} className={index === 0 ? "pl-4" : "pl-8"}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
            
         
        </Table>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Button
          className="p-2"
          variant="outline"
          disabled = {currentPage===1}
          onClick={() => setCurrentPage(1)}
        >
          <SkipBackIcon className="h-4 w-4" />
        </Button>
        <Button
          className="p-2"
          variant="outline"
          disabled = {currentPage===1}
          onClick={() => setCurrentPage(currentPage-1)}
        >
          <ChevronLeftIcon className="h-4 w-4"/>
        </Button>
        <Button
          className="p-2"
          variant="outline"
          onClick={() => setCurrentPage(currentPage+1)}
          disabled={currentPage === totalPageCount}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          className="p-2"
          variant="outline"
          onClick={() => setCurrentPage(totalPageCount)}
          disabled={currentPage === totalPageCount}
        >
          <SkipForwardIcon className="h-4 w-4" />
        </Button>
        <span className="flex justify-evenly items-center gap-1">
          <div>Page {" "}</div>
          <strong>
            {`${currentPage} of ${totalPageCount}`}
          </strong>
        </span>
        <span>
          Showing {' '} 
        </span>
        <Select
          onValueChange={field => {
            setRowsPerPage(Number(field))
          }}
          defaultValue="15"
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[15, 25, 35, 45, 60, 80, 100].map(pageSize => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>
          rows per page
        </span>
      </div>
    </div>

    </Suspense>
  )
}