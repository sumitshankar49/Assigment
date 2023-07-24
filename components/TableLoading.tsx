import { Skeleton } from "./ui/skeleton";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const TableLoading = () => {
  return (
    <>
      <TableBody className="w-full">
        {["1", "2,", "3", "4,", "5,", "6", "7","8", "9", "10"].map((row) => (
            <TableRow 
              className="w-full"
              key={row}
            >
              {["1", "2,", "3", "4,", "5,", "6", "7"].map((cell, index) => (
                <TableCell
                  key={cell}
                  className={index === 0 ? "pl-4" : "pl-8"}
                >
                  {
                    index===0 ? <Skeleton className="w-[20px] h-[20px]" /> : <Skeleton className="w-[160px] h-[40px]" />
                  }
                  
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </>
  );
};

export default TableLoading;
