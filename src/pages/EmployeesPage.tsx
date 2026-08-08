import { useEffect, useMemo, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import FormField from '../components/FormField';
import { mockEmployees } from '../utils/mockData';
import type { Employee, EmployeeStatus, Department, EmployeeRole } from '../types';
import StatsBadge from '../components/StatsBadge';

const departments: Department[] = ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Ventas'];
const statuses: (EmployeeStatus | '')[] = ['', 'active', 'on_leave', 'inactive'];
const roles: EmployeeRole[] = ['employee', 'hr', 'admin'];

const formFieldClass =
  'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

const statusLabels: Record<EmployeeStatus | '', string> = {
  '': 'Todos los estados',
  active: 'Activo',
  on_leave: 'Permiso',
  inactive: 'Inactivo',
};

const roleLabels: Record<EmployeeRole, string> = {
  employee: 'Empleado',
  hr: 'Recursos Humanos',
  admin: 'Administrador',
};

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<EmployeeStatus | ''>('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newDepartment, setNewDepartment] = useState<Department>('Tecnología');
  const [newSalary, setNewSalary] = useState('');
  const [newHireDate, setNewHireDate] = useState('');
  const [newStatus, setNewStatus] = useState<EmployeeStatus>('active');
  const [newRole, setNewRole] = useState<EmployeeRole>('employee');
  const [newPhone, setNewPhone] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 300);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const matchesSearch = [employee.name, employee.email, employee.position]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesDepartment =
          selectedDepartment === '' || employee.department === selectedDepartment;

        const matchesStatus = selectedStatus === '' || employee.status === selectedStatus;

        return matchesSearch && matchesDepartment && matchesStatus;
      }),
    [employees, search, selectedDepartment, selectedStatus],
  );

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.status === 'active').length;
  const onLeaveEmployees = employees.filter((employee) => employee.status === 'on_leave').length;
  const inactiveEmployees = employees.filter((employee) => employee.status === 'inactive').length;

  const handleSelectEmployee = (employee: Employee) => {
    alert(`Seleccionaste a ${employee.name} — ${employee.position}`);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedDepartment('');
    setSelectedStatus('');
  };

  const handleAddEmployee = () => {
    if (!newName.trim() || !newEmail.trim() || !newPosition.trim() || !newSalary.trim() || !newHireDate.trim()) {
      return;
    }

    const nextId = employees.length > 0 ? Math.max(...employees.map((employee) => employee.id)) + 1 : 1;
    const createdEmployee: Employee = {
      id: nextId,
      name: newName.trim(),
      email: newEmail.trim(),
      position: newPosition.trim(),
      department: newDepartment,
      salary: Number(newSalary),
      hireDate: newHireDate,
      status: newStatus,
      role: newRole,
      phone: newPhone.trim() || undefined,
      avatarUrl: newAvatarUrl.trim() || undefined,
    };

    setEmployees((current) => [createdEmployee, ...current]);
    setShowForm(false);
    setNewName('');
    setNewEmail('');
    setNewPosition('');
    setNewDepartment('Tecnología');
    setNewSalary('');
    setNewHireDate('');
    setNewStatus('active');
    setNewRole('employee');
    setNewPhone('');
    setNewAvatarUrl('');
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees((current) => current.filter((employee) => employee.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Encabezado */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Gestión de Empleados</h2>
            <p className="text-slate-500 mt-1">
              {filteredEmployees.length} de {employees.length} empleados
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((current) => !current)}
            className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            + Agregar empleado
          </button>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-wrap gap-4 mb-6">
          <StatsBadge label="Total de empleados" value={totalEmployees} variant="blue" />
          <StatsBadge label="Empleados activos" value={activeEmployees} variant="green" />
          <StatsBadge label="Empleados en permiso" value={onLeaveEmployees} variant="yellow" />
          <StatsBadge label="Empleados inactivos" value={inactiveEmployees} variant="red" />
        </div>

        {/* Formulario de alta */}
        {showForm && (
          <div className="p-4 mb-6 bg-white rounded-lg border border-blue-200">
            <p className="mb-3 font-semibold text-slate-900">Nuevo empleado</p>
            <div className="grid gap-3 mb-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
              <FormField label="Nombre *">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  autoFocus
                  className={formFieldClass}
                />
              </FormField>

              <FormField label="Email *">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="juan.perez@empresa.com"
                  className={formFieldClass}
                />
              </FormField>

              <FormField label="Cargo *">
                <input
                  type="text"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  placeholder="Ej. Analista de Ventas"
                  className={formFieldClass}
                />
              </FormField>

              <FormField label="Departamento *">
                <select
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value as Department)}
                  className={formFieldClass}
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Salario mensual *">
                <input
                  type="number"
                  min="0"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  placeholder="Ej. 8500"
                  className={formFieldClass}
                />
              </FormField>

              <FormField label="Fecha de ingreso *">
                <input
                  type="date"
                  value={newHireDate}
                  onChange={(e) => setNewHireDate(e.target.value)}
                  className={formFieldClass}
                />
              </FormField>

              <FormField label="Estado *">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as EmployeeStatus)}
                  className={formFieldClass}
                >
                  {statuses
                    .filter((status): status is EmployeeStatus => status !== '')
                    .map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                </select>
              </FormField>

              <FormField label="Rol *">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as EmployeeRole)}
                  className={formFieldClass}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role]}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Teléfono (opcional)">
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Ej. 5555-5555"
                  className={formFieldClass}
                />
              </FormField>

              <FormField label="URL de foto (opcional)">
                <input
                  type="text"
                  value={newAvatarUrl}
                  onChange={(e) => setNewAvatarUrl(e.target.value)}
                  placeholder="https:// ..."
                  className={formFieldClass}
                />
              </FormField>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Barra de filtros */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-wrap items-end gap-3">
          <FormField label="Buscar" className="flex-1 min-w-[220px]">
            <input
              type="text"
              placeholder="Buscar por nombre, email o cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={formFieldClass}
            />
          </FormField>

          <FormField label="Departamento" className="min-w-[180px]">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value as Department | '')}
              className={formFieldClass}
            >
              <option value="">Todos los departamentos</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Estado" className="min-w-[160px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as EmployeeStatus | '')}
              className={formFieldClass}
            >
              <option value="">Todos los estados</option>
              {statuses
                .filter((status): status is EmployeeStatus => status !== '')
                .map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
            </select>
          </FormField>

          {(search || selectedDepartment || selectedStatus) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-12 text-slate-500">
            <p>Cargando empleados ...</p>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No se encontraron empleados con los filtros aplicados.</p>
          </div>
        )}

        {/* Lista de empleados */}
        {!loading && filteredEmployees.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="relative">
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  aria-label="Eliminar empleado"
                  title="Eliminar empleado"
                  className="absolute -top-2.5 -right-2.5 z-10 w-6 h-6 rounded-full border-2 border-white bg-red-500 text-white cursor-pointer text-sm leading-5 shadow-md"
                >
                  ×
                </button>
                <EmployeeCard employee={employee} onSelect={handleSelectEmployee} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default EmployeesPage;
