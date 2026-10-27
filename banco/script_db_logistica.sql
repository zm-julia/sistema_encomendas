CREATE DATABASE IF NOT EXISTS db_logistica;
USE db_logistica;

DROP TABLE IF EXISTS Entrega;
DROP TABLE IF EXISTS Carga;
DROP TABLE IF EXISTS Motorista;
DROP TABLE IF EXISTS Funcionario;

CREATE TABLE Funcionario (
    codFuncionario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    PRIMARY KEY (codFuncionario)
);

CREATE TABLE Motorista (
    codMotorista INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(100) NOT NULL,
    cpf VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    PRIMARY KEY (codMotorista)
);

CREATE TABLE Carga (
    codCarga INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL,
    peso DECIMAL(10,2) NOT NULL,
    volume DECIMAL(10,2) NOT NULL,
    rastreio VARCHAR(100) NOT NULL,
    idMotorista INT NOT NULL,
    PRIMARY KEY (codCarga),
    FOREIGN KEY (idMotorista) REFERENCES Motorista (codMotorista) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Entrega (
    codEntrega INT NOT NULL AUTO_INCREMENT,
    cidade VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    status ENUM('ENTREGUE','TRANSITO') NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    idCarga INT NOT NULL,
    PRIMARY KEY (codEntrega),
    FOREIGN KEY (idCarga) REFERENCES Carga (codCarga) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO Funcionario (nome, email, senha) VALUES
('Carlos Silva', 'carlos@logistica.com', 'U2FsdGVkX1+vRtYwXfaue1SLD0N4MMrVAAeUMdZaZ10='),
('Maria Souza', 'maria@logistica.com', 'U2FsdGVkX18if97rLqxB9EhX9YT4zfS3cZerJOuDRBg='),
('Joao Pereira', 'joao@logistica.com', 'U2FsdGVkX1+sSRC4QzF/RsmdJ7bPgmor6PGe46aw/Xg=');

INSERT INTO Motorista (nome, cnh, cpf, telefone) VALUES
('Roberto Lima', 'U2FsdGVkX1/2CvcyewHgFNQ87Qf3ZjaxhugALQ2kmP8=', 'U2FsdGVkX1/EWFIO9x1mYQfsUPPGMAOO/70XyNM8tRE=', '48999991111'),
('Fernanda Costa', 'U2FsdGVkX18+3WADULcfkBg9xgRzqnPYIxQXY1veAxU=', 'U2FsdGVkX1/uDqB7xn5WxnqRkLI1Z0bXPV9y7AMyn1c=', '48988882222'),
('Paulo Mendes', 'U2FsdGVkX1+oi7Jyou1FoC/Bg90TJEcsLuYa005X4Jw=', 'U2FsdGVkX19gztEEyHoWDap84yclBuVB8iG891Blelg=', '48977773333');

INSERT INTO Carga (descricao, peso, volume, rastreio, idMotorista) VALUES
('Caixas de eletronicos', 120.50, 2.30, '100000000001', 1),
('Paletes de alimentos', 850.00, 6.80, '100000000002', 2),
('Pecas automotivas', 310.75, 3.10, '100000000003', 3);

INSERT INTO Entrega (cidade, destino, status, data, hora, idCarga) VALUES
('Florianopolis', 'Rua das Flores, 123', 'TRANSITO', '2026-10-25', '14:00:00', 1),
('Joinville', 'Av. Brasil, 456', 'ENTREGUE', '2026-10-05', '10:30:00', 2),
('Blumenau', 'Rua Central, 789', 'TRANSITO', '2026-10-15', '16:00:00', 3);
