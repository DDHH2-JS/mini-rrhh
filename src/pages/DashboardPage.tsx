import { Link } from 'react-router-dom';
import { mockEmployees } from '../utils/mockData';

function DashboardPage() {
  const userName = localStorage.getItem('userName') ?? 'Usuario';
  const total = mockEmployees.length;
  const active = mockEmployees.filter((employee) => employee.status === 'active').length;
  const onLeave = mockEmployees.filter((employee) => employee.status === 'on_leave').length;

  const stats = [
    { label: 'Total empleados', value: total, color: '#dbeafe', textColor: '#1e40af' },
    { label: 'Activos', value: active, color: '#dcfce7', textColor: '#166534' },
    { label: 'En permiso', value: onLeave, color: '#fef9c3', textColor: '#854d0e' },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="mb-10">
        <p className="text-sm text-slate-500">Resumen</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Bienvenido, {userName}</h1>
        <p className="mt-2 text-slate-600">Aquí puedes ver el estado actual de tu equipo y gestionar empleados.</p>
      </section>

      <div className="mb-10 flex flex-col gap-5 sm:flex-row">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 rounded-4xl p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg"
            style={{ background: stat.color }}
          >
            <p className="text-sm font-medium" style={{ color: stat.textColor }}>
              {stat.label}
            </p>
            <p className="mt-4 text-4xl font-semibold" style={{ color: stat.textColor }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-4xl bg-white px-8 py-10 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Acciones rápidas</h2>
            <p className="mt-1 text-slate-600">Navega a los empleados o revisa el estado del equipo.</p>
          </div>
          <Link
            to="/empleados"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 hover:bg-blue-800 transition"
          >
            Ver empleados
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
