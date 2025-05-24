-- Criação do banco (se desejar)
CREATE DATABASE IF NOT EXISTS intranet;
USE intranet;

-- Tabela principal de convênios
CREATE TABLE convenios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL COMMENT 'Nome do arquivo da imagem (logo)',
    manual VARCHAR(255) DEFAULT NULL COMMENT 'Nome do arquivo do manual (PDF ou DOCX)',
    login VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    observacao TEXT DEFAULT NULL COMMENT 'Observações gerais do convênio',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tipos de atendimento vinculados ao convênio
CREATE TABLE convenios_atendimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    atendimento VARCHAR(100) NOT NULL,
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);

-- Tipos de planos vinculados ao convênio
CREATE TABLE convenios_planos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    plano VARCHAR(100) NOT NULL,
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);

-- Tipos de internação vinculados ao convênio
CREATE TABLE convenios_internacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    internacao VARCHAR(100) NOT NULL,
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);

-- Exames bloqueados vinculados ao convênio
CREATE TABLE convenios_exames_bloqueados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    exame VARCHAR(100) NOT NULL,
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);

-- Emails vinculados ao convênio
CREATE TABLE convenios_emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    email VARCHAR(150) NOT NULL,
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);

-- Telefones vinculados ao convênio
CREATE TABLE convenios_telefones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);

-- Links vinculados ao convênio
CREATE TABLE convenios_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convenio_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL COMMENT 'Descrição do link (Ex.: Site, Área Restrita)',
    url VARCHAR(255) NOT NULL COMMENT 'Endereço do link',
    FOREIGN KEY (convenio_id) REFERENCES convenios(id) ON DELETE CASCADE
);
