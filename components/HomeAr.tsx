'use client'
import { useEmployeesStatus } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { PageWrapper } from '@/app/page-wrapper';
import { Variants } from 'framer-motion';

type FiltersListType = {
  id: string;
  name: string;
};

const HomeAr = () => {
  const { setEmployeesStatus, employeesStatus } = useEmployeesStatus();
  

  console.log(employeesStatus);
  const { data: filtersList, isLoading } = useQuery<FiltersListType[]>({
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/employeeTableFiltersList');
      return data;
    },
    queryKey: ['categories-query', employeesStatus],
  });
  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    
    <PageWrapper >
    <div className='w-full'>
      <div className='flex justify-between items-center w-full py-1'>
        <p>Employees</p>
        <Select onValueChange={(field) => setEmployeesStatus(field)}>
          <SelectTrigger className='w-[100px] capitalize'>
            <SelectValue placeholder="Filter"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filtersList?.map((filter) =>(
                  <SelectItem
                  key={filter.id}
                  value={filter.name}
                  className='capitalize'
                  >
                    {
                      filter.name
                    }
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>

        </Select>
        

      </div>

    </div>
    </PageWrapper>
    
  )
};

export default HomeAr;
