import { Link, useParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";

const statusLabels = {
  active: "Activo",
  inactive: "Inactivo",
  on_leave: "En permiso",
} as const;

const roleLabels = {
  admin: "Administrador",
  hr: "Recursos Humanos",
  employee: "Empleado",
} as const;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
  }).format(new Date(`${date}T00:00:00`));

const formatSalary = (salary: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(salary);

function EmployeeDetailPage() {
  const { id } = useParams();
  const { employee, isLoading, error } = useEmployee(id);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-6 text-slate-500" role="status" aria-live="polite">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" aria-hidden="true" />
        Cargando información del empleado...
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-600">No se pudo cargar la información del empleado.</p>;
  }

  if (!employee) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-900">Empleado no encontrado</h2>
        <Link to="/empleados" className="mt-4 inline-block text-blue-700 hover:underline">
          Volver a empleados
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <Link to="/empleados" className="inline-flex rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300">
        ← Volver
      </Link>

      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-3xl font-semibold text-blue-700">
            {employee.avatarUrl ? (
              <img src={employee.avatarUrl} alt={`Avatar de ${employee.name}`} className="h-full w-full object-cover" />
            ) : (
              employee.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
            <p className="mt-1 text-slate-500">{employee.position}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <div><dt className="text-sm text-slate-500">Email</dt><dd className="font-medium text-slate-900">{employee.email}</dd></div>
          <div><dt className="text-sm text-slate-500">Teléfono</dt><dd className="font-medium text-slate-900">{employee.phone || "No registrado"}</dd></div>
          <div><dt className="text-sm text-slate-500">Departamento</dt><dd className="font-medium text-slate-900">{employee.department}</dd></div>
          <div><dt className="text-sm text-slate-500">Rol</dt><dd className="font-medium text-slate-900">{roleLabels[employee.role]}</dd></div>
          <div><dt className="text-sm text-slate-500">Salario</dt><dd className="font-medium text-slate-900">{formatSalary(employee.salary)}</dd></div>
          <div><dt className="text-sm text-slate-500">Fecha de ingreso</dt><dd className="font-medium text-slate-900">{formatDate(employee.hireDate)}</dd></div>
          <div><dt className="text-sm text-slate-500">Estado</dt><dd className="font-medium text-slate-900">{statusLabels[employee.status]}</dd></div>
        </dl>
      </section>
    </div>
  );
}

export default EmployeeDetailPage;