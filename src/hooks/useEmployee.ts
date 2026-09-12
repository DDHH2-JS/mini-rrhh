import { useEffect } from "react";
import { useEmployeeStore } from "../stores/employeeStore";

export function useEmployee(id: string | undefined) {
  const employees = useEmployeeStore((state) => state.employees);
  const isLoading = useEmployeeStore((state) => state.isLoading);
  const error = useEmployeeStore((state) => state.error);
  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees);

  useEffect(() => {
    if (employees.length === 0) {
      void fetchEmployees();
    }
  }, [employees.length, fetchEmployees]);

  const employee = employees.find((item) => item.id === Number(id));

  return { employee, isLoading, error };
}