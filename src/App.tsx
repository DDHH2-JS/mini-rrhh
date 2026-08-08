import { useMemo, useState } from 'react';
import Header from './layouts/Header';
import EmployeeCard from './components/EmployeeCard';
import { mockEmployees } from './utils/mockData';
import type { Employee, EmployeeStatus, Department } from './types';
import StatsBadge from './components/StatsBadge';

const departments: (Department | 'Todos los departamentos')[] = [
  'Todos los departamentos',
  'Tecnología',
  'Recursos Humanos',
  'Finanzas',
  'Operaciones',
  'Ventas',
];

const statuses: (EmployeeStatus | 'Todos los estados')[] = [
  'Todos los estados',
  'active',
  'on_leave',
  'inactive',
];

function App() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<Department | 'Todos los departamentos'>('Todos los departamentos');
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'Todos los estados'>('Todos los estados');

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch = [employee.name, employee.position, employee.department]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === 'Todos los departamentos' || employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === 'Todos los estados' || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [search, departmentFilter, statusFilter]);

  const totalEmployees = mockEmployees.length;

  const activeEmployees = mockEmployees.filter((employee) => employee.status === 'active').length;
  const onLeaveEmployees = mockEmployees.filter((employee) => employee.status === 'on_leave').length;
  const inactiveEmployees = mockEmployees.filter((employee) => employee.status === 'inactive').length;

  const handleSelectEmployee = (employee: Employee) => {
    alert(`Seleccionaste a ${employee.name} — ${employee.position}`);
  };

  const handleClearFilters = () => {
    setSearch('');
    setDepartmentFilter('Todos los departamentos');
    setStatusFilter('Todos los estados');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header />
      <main style={{ padding: '24px 24px 40px', maxWidth: '1240px', margin: '0 auto' }}>
        <section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <p style={{ margin: 0, color: '#334155', fontSize: '14px' }}>Gestión de Empleados</p>
            <h2 style={{ margin: '6px 0 0', color: '#0f172a', fontSize: '32px' }}>
              {filteredEmployees.length} de {totalEmployees} empleados
            </h2>
          </div>

          <button
            type="button"
            style={{
              background: '#1d4ed8',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontWeight: 600,
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)',
            }}
          >
            + Agregar empleado
          </button>
        </section>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            marginBottom: '30px',
          }}
        >
          <StatsBadge label="Total de empleados" value={totalEmployees} variant="blue" />
          <StatsBadge label="Empleados activos" value={activeEmployees} variant="green" />
          <StatsBadge label="Empleados en permiso" value={onLeaveEmployees} variant="yellow" />
          <StatsBadge label="Empleados inactivos" value={inactiveEmployees} variant="red" />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar empleado..."
            style={{
              flex: '1 1 320px',
              minWidth: 280,
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#0f172a',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
            }}
          />

          <select
            value={departmentFilter}
            onChange={(event) => setDepartmentFilter(event.target.value as Department | 'Todos los departamentos')}
            style={{
              flex: '0 0 200px',
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#0f172a',
            }}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as EmployeeStatus | 'Todos los estados')}
            style={{
              flex: '0 0 200px',
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#0f172a',
            }}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'active'
                  ? 'Activo'
                  : status === 'on_leave'
                  ? 'Permiso'
                  : status === 'inactive'
                  ? 'Inactivo'
                  : status}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleClearFilters}
            style={{
              flex: '0 0 160px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              color: '#475569',
              cursor: 'pointer',
              fontWeight: 600,
              padding: '14px 16px',
            }}
          >
            Limpiar filtros
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
          }}
        >
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onSelect={handleSelectEmployee}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
