import sqlite3

DBFILENAME = 'staffaccounts.db'


def create_db(dbfilename=DBFILENAME):
    with sqlite3.connect(dbfilename) as conn:
        cur = conn.cursor()
        SQL = """ DROP TABLE IF EXISTS accounts;"""
        cur.execute(SQL)

        SQL = """
        CREATE TABLE accounts (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255),
            password_hash VARCHAR(128),
            api_key VARCHAR(255)
        );
        """
        cur.execute(SQL)
if __name__ == "__main__":
    create_db()
