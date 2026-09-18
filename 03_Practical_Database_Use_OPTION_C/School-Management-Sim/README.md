# HW7: Individual Database Project - School Management Simulation

**Student:** Pasin Makcharoen
**Student ID:** 6810545794

## Selected Option

**Option C - Simple Database Application**

A full web application was built with Next.js and MySQL (via `mysql2`, no ORM), demonstrating:
- **Adding a new record** — `/root/creation`, a form supporting all 5 entities (School, Student, Teacher, Subject, Enrollment)
- **Searching for or viewing records** — `/` (Dashboard), listing all records for all 5 tables with live counts
- **Updating or deleting a record** — Edit/Delete actions on every record in the Dashboard, backed by `PUT`/`DELETE` API routes
- **3+ meaningful reports using joined/aggregated data** — `/root/view`, a Query Type dropdown running 5 SQL reports (see below)

The 5 reporting queries collectively include:
- A query joining multiple tables (Query 1)
- A query using GROUP BY and an aggregate function (Query 2)
- A query using HAVING (Query 3)
- A query using a subquery (Query 4)
- A query answering an interesting business question (Query 5)

## DBMS and Tools Used

- **Database:** MySQL 8.4, hosted on Aiven (cloud MySQL service)
- **Backend/Frontend:** Next.js (App Router), using the `mysql2` package for raw SQL queries - no ORM
- **UI:** shadcn/ui components with Tailwind CSS
- **Deployment:** Vercel
- **Live app:** https://school-management-sim-rho.vercel.app

## Project Scope

A simplified school management system tracking 5 related tables:
- **School** - schools in the system
- **Student** - students enrolled at a school
- **Teacher** - teachers employed at a school
- **AvaliableSubjects** - subjects presents
- **Enrollment** - records of which students are enrolled in which subjects, with finalized grades

## How to Run the Web Application

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with your MySQL connection details:
   ```
   DB_HOST=<your-mysql-host>
   DB_PORT=<your-mysql-port>
   DB_USER=<your-mysql-user>
   DB_PASSWORD=<your-mysql-password>
   DB_NAME=<your-database-name>
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

Alternatively, visit the deployed version directly: https://school-management-sim-rho.vercel.app

## How to Run the SQL Script

1. Create a MySQL database:
```sql
   CREATE DATABASE SIMULATION_DATABASE_6810545794;
```
2. Run the submitted `.sql` file against that database using a MySQL client (Workbench, CLI, etc.):
```bash
   mysql -u <user> -p SIMULATION_DATABASE_6810545794 < SIMULATION_DATABASE_6810545794.sql
```
3. The script creates all 5 tables with primary/foreign key constraints and inserts sample data (5+ rows per master table, 10+ rows in Enrollment).

## App Navigation

- **Home (`/`)** — dashboard showing record counts and full listings for all 5 tables, with Edit and Delete actions for each record
- **`/root/creation`** - form to create a new record for any of the 5 entities
- **`/root/update`** - form to update an existing records
- **`/root/view`** - Query Type dropdown to run and view results for the 5 SQL reporting queries
- **`/root/aboutme`** - project and developer information