# Export MySQL Data To Excel File

A small utility that helps us to export data from MySQL database to Excel easily and quickly with one command.

## Installation

Run git clone

```bash
git clone https://github.com/tcongcq/export-mysql-data-to-excel-file.git
```

## Usage

Create database and import data example from file "database.sql"

```bash
mysql -u username -p database_name < database.sql
```

Copy .env and change it to correct database configs.

```bash
cp .env.example .env
```

Install dependencies by NPM and run start.

```bash
npm install
npm start
```

And next step. Oh no. No need any step, file export already store in "export_data" folder.

--- It's too easy, isn't it? ---