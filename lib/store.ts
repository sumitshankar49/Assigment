
import {create} from 'zustand'

type sideBarState = {
  showSideBar : boolean
  setShowSideBar : (showSideBar : boolean) => void
}

export const useSideBarStore = create<sideBarState>()((set) => ({
  showSideBar : false,
  setShowSideBar : (showSideBar : boolean) =>set({showSideBar})
}))

type EmployeesStatus = {
  employeesStatus : string
  setEmployeesStatus : ( employeesStatus : string ) => void
}

export const useEmployeesStatus = create<EmployeesStatus>()((set) => ({
  employeesStatus : "all",
  setEmployeesStatus : ( employeesStatus : string) => set({employeesStatus}),
}))

type SectionType = {
  section : string
  setSection : ( section : string) => void
}

export const useSection = create<SectionType>()((set) => ({
  section : "department",
  setSection : ( section : string) => set({section}),
}))


type SortByType = {
  sortBy : string
  setSortBy : ( sortBy : string) => void
}

export const useSortBy = create<SortByType>()((set) => ({
  sortBy : "",
  setSortBy : ( sortBy : string) => set({sortBy}),  
}))

type orderType = {
  order : string
  setOrder : ( order : string) => void
}

export const useOrder = create<orderType>()((set) => ({
  order : "",
  setOrder : ( order : string) => set({order}),  
}))

type currentPageType = {
  currentPage : number
  setCurrentPage : ( currentPage : number) => void
}

export const useCurrentPage = create<currentPageType>()((set) => ({
  currentPage : 1,
  setCurrentPage : ( currentPage : number) => set({currentPage}),  
}))

type rowsPerPageType = {
  rowsPerPage : number
  setRowsPerPage : ( rowsPerPage : number) => void
}

export const useRowsPerPage = create<rowsPerPageType>()((set) => ({
  rowsPerPage : 10,
  setRowsPerPage : ( rowsPerPage : number) => set({rowsPerPage}),  
}))
