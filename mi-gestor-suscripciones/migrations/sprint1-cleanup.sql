-- Sprint 1 cleanup: eliminar tablas y columnas de gastos variables y presupuesto
-- Idempotente: usa IF EXISTS en todas las operaciones

-- 1. Eliminar tabla de gastos variables
DROP TABLE IF EXISTS expenses;

-- 2. Eliminar tabla de presupuestos mensuales
DROP TABLE IF EXISTS monthly_budgets;

-- 3. Eliminar columnas de ingresos y meta de ahorro del perfil de usuario
ALTER TABLE profiles
  DROP COLUMN IF EXISTS income,
  DROP COLUMN IF EXISTS savings_goal;
