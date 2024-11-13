# BalanceSheet Report preview from Xero APIs

### How to run ?

- Both backend and frontend are dockerize so at root of repo we just need to run `npm start` command so it will directly run both containers and start frontend on `http://localhost:3000`, backend on `http://localhost:3001` and balance sheet service on `http://localhost:3005`.

- All container related configuration are managed inside `docker-compose.yml` file and env variable are managed inside `.env.docker` file.