import sqlite3
from app.account import Account
import time

DBNAME = "staffaccounts.db"

def seed(dbname=DBNAME):
    with sqlite3.connect(dbname) as conn:
        SQL = "DELETE FROM accounts;"
        cur = conn.cursor()
        cur.execute(SQL)
            

    account = Account()
    account.username = "vit"
    account.set_password("mypass")
    account.api_key = '0123456789abcde'
    account.save()

if __name__ == "__main__":
    seed()
