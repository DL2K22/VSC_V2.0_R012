import sqlite3

banco = sqlite3.connect("banco_dash.db")

cursor = banco.cursor()

# cursor.execute('''CREATE TABLE IF NOT EXISTS Registro 
    # (ID INTEGER PRIMARY KEY, 
    # SSB VARCHAR(6) NOT NULL, 
    # EMAIL VARCHAR(100), 
    # SENHA NVARCHAR(32))''')
# print ('TABELA CRIADA COM SUCESSO')

# cursor.execute("INSERT INTO Registro (SSB, EMAIL, SENHA) VALUES('LBA4CT', 'lucas.barrios@scania.com', '1234')")
# banco.commit()
# print ('DADOS INSERIDOS COM SUCESSO')

#cursor.execute("DROP TABLE Registro")

for row in cursor.execute('SELECT * FROM Registro'):
    print(row)
