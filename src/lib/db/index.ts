import { Pool, PoolConfig, QueryResult, QueryResultRow } from 'pg';

let poolInstance: Pool | null = null;

export function getPool(): Pool {
  if (!poolInstance) {
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nisolai';
    const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1') || connectionString.includes('10.0.0.');

    const config: PoolConfig = {
      connectionString,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      // Cloud databases outside VPC may require SSL, internal VPC typically does not
      ssl: isLocalhost || process.env.NODE_ENV === 'development' ? false : { rejectUnauthorized: false },
    };

    poolInstance = new Pool(config);

    poolInstance.on('error', (err) => {
      console.error('[PostgreSQL Pool Error]:', err.message);
    });
  }

  return poolInstance;
}

export const pool = getPool();

/**
 * Executes a parameterized SQL query on the PostgreSQL connection pool.
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params: any[] = []
): Promise<QueryResult<T>> {
  const p = getPool();
  return p.query<T>(text, params);
}

/**
 * Returns a single row from a query or null if no row found.
 */
export async function getOne<T extends QueryResultRow = any>(
  text: string,
  params: any[] = []
): Promise<T | null> {
  const res = await query<T>(text, params);
  return res.rows[0] || null;
}

/**
 * Returns all rows from a query.
 */
export async function getAll<T extends QueryResultRow = any>(
  text: string,
  params: any[] = []
): Promise<T[]> {
  const res = await query<T>(text, params);
  return res.rows;
}

/**
 * Executes operations inside a managed database transaction.
 */
export async function withTransaction<T>(
  callback: (client: import('pg').PoolClient) => Promise<T>
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
