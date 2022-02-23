import sqlite3
# import pymysql



class Database():
    def __init__(self, db):
        self.conn = sqlite3.connect(db)
        self.cursor = self.conn.cursor()

    def drop_table(self, table):
        try:
            sql = 'DROP TABLE ' + table
            self.cursor.execute(sql)
            self.conn.commit()
        except Exception as e:
            print(e)
        print(table, 'table is deleted.')

    def show_table(self, table):
        sql = 'select * from ' + table
        self.cursor.execute(sql)
        res = self.cursor.fetchall()
        return res

    def close_db(self):
        self.conn.close()

    def create(self, table, cols):
        self.cursor.execute("select name from sqlite_master where type='table' order by name")
        table_lists = self.cursor.fetchall()
        if len(table_lists)>0:
            table_lists = [i[0] for i in table_lists]
            # print(table_lists)
            if table in table_lists:
                print('table already exist. skip create.')
                return
        sql = 'CREATE TABLE ' + table + ' ('
        for c in cols:
            sql += c + ', '
        sql = sql[:-2]
        sql += ')'
        print(sql)
        self.cursor.execute(sql)
        self.conn.commit()

    def insert(self, table, vals, cols=[]):
        sql = 'INSERT INTO '+table
        if cols:
            sql += '('
            for c in cols:
                sql += c+', '
            sql = sql[:-1]
            sql += ')'
        sql += ' VALUES ('
        for v in vals:
            sql += f'"{v}", '
        sql = sql[:-2]
        sql += ')'
        print(sql)
        self.cursor.execute(sql)
        self.conn.commit()

if __name__ == '__main__':
    db = Database('raw_data.db')
    # db.drop_table('REPORTS')
    db.create('REPORTS', ['BEGIN_DATE TEXT', 'END_DATE TEXT'])
    db.insert('REPORTS', ['20000101', '20000103'])
    res = db.show_table('reports')
    print(res)
    db.close_db()

