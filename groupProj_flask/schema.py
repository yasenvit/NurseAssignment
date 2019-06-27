import sqlite3

DBFILENAME = 'nurseassignment.db'


def create_db(dbfilename=DBFILENAME):
    with sqlite3.connect(dbfilename) as conn:
        cur = conn.cursor()

        SQL = """ DROP TABLE IF EXISTS caremanager;"""
        cur.execute(SQL)

        SQL = """
        CREATE TABLE caremanager (
            cmpk INTEGER PRIMARY KEY AUTOINCREMENT,
            cm_firstname VARCHAR(255),
            cm_lastname VARCHAR(255),
            cm_maxcaseload INTEGER,
            active_status INTEGER
            
        );
        """
        cur.execute(SQL)

        SQL = """ DROP TABLE IF EXISTS caremanagerzip;"""
        cur.execute(SQL)

        SQL = """
        CREATE TABLE caremanagerzip (
            cmzpk INTEGER PRIMARY KEY AUTOINCREMENT,
            cmpk INTEGER,
            zipcode VARCHAR(50),
            priority INTEGER,
            active_status INTEGER            
        );
        """
        cur.execute(SQL)

        SQL = """ DROP TABLE IF EXISTS member;"""
        cur.execute(SQL)

        SQL = """
        CREATE TABLE member (
            mempk INTEGER PRIMARY KEY AUTOINCREMENT,
            mem_firstname VARCHAR(255),
            mem_lastname VARCHAR(255),
            mem_address VARCHAR(500),
            mem_city VARCHAR(50),
            mem_state VARCHAR(50),
            mem_zip VARCHAR(50),
            mem_longitude REAL,
            mem_latitude REAL
                       
        );
        """
        cur.execute(SQL)

        SQL = """
        CREATE TABLE caremanagermember (
            cmmempk INTEGER PRIMARY KEY AUTOINCREMENT,
            cmpk INTEGER,
            mempk INTEGER                                 
        );
        """
        cur.execute(SQL)

        SQL = """ DROP TABLE IF EXISTS staffaccounts;"""
        cur.execute(SQL)

        SQL = """
        CREATE TABLE staffaccounts (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255),
            password_hash VARCHAR(128),
            api_key VARCHAR(255)
        );
        """
        cur.execute(SQL)
        


if __name__ == "__main__":
    create_db(DBFILENAME)