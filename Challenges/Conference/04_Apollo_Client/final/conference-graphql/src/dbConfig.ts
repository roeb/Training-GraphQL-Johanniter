export const mssqlConnection = {
  client: 'mssql',
  connection: {
    host: "127.0.0.1",
    port: 1633,
    user: "sa",
    password: "GraphQL@Workshop",
    database: "conference",
    options: {
      trustServerCertificate: true
    }
  },
}


export const mysqlConnection = {
  client: 'mysql2',
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "GraphQL@Workshop",
    database: "conference",
    options: {
      trustServerCertificate: true
    }
  },
}