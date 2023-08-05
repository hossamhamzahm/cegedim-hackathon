CREATE DATABASE Hackathon;

GO

CREATE Procedure CreateAllTables
AS

CREATE TABLE SystemUser(
username VARCHAR(20),
password VARCHAR(20),
type VARCHAR(20),
PRIMARY KEY(username));

CREATE TABLE Patient(
pID INT IDENTITY(1,1),
firstName VARCHAR(20),
lastName VARCHAR(20),
username VARCHAR(20),
phoneNumber BIGINT CONSTRAINT ElevenDigits CHECK (phoneNumber BETWEEN 01000000000 AND 01999999999),
address VARCHAR(20),
diagnosis VARCHAR(100),
PRIMARY KEY(pID),
FOREIGN KEY(username) REFERENCES SystemUser ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Pharmacy(
pharmID INT IDENTITY(1,1),
name VARCHAR(20),
username VARCHAR(20),
phoneNumber INT,
location VARCHAR(20),
PRIMARY KEY(pharmID),
FOREIGN KEY(username) REFERENCES SystemUser ON UPDATE CASCADE ON DELETE CASCADE);


CREATE TABLE Doctor(
dID INT IDENTITY(1,1),
firstName VARCHAR(20),
lastName VARCHAR(20),
username VARCHAR(20),
specialization VARCHAR(20),
PRIMARY KEY(dID),
FOREIGN KEY(username) REFERENCES SystemUser ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE PatientRequest(
id INT IDENTITY(1,1),
pID INT,
medicine VARCHAR(20),
/* Default 1= unhandled/ 0=handled */
status BIT DEFAULT(1),    
PRIMARY KEY(id),
FOREIGN KEY(pID) REFERENCES Patient ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE PharmacyRequest(
id INT IDENTITY(1,1),
pharm_id INT,
dID INT,
pID INT,
/*1=unhandled 0=handled*/
status BIT DEFAULT(1),    
message VARCHAR(200),
PRIMARY KEY(id),
FOREIGN KEY(pID) REFERENCES Patient ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(pharm_id) REFERENCES Pharmacy ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY(dID) REFERENCES Doctor ON UPDATE CASCADE ON DELETE CASCADE);

GO

CREATE Procedure dropAllTables
AS 
DROP TABLE SystemUser
DROP TABLE Patient
DROP TABLE Doctor
DROP TABLE Pharmacy
DROP TABLE PatientRequest
DROP TABLE PharmacyRequest


GO

CREATE Procedure clearAllTables
AS 
DELETE FROM SystemUser
DELETE FROM Patient
DELETE FROM  Doctor
DELETE FROM Pharmacy
DELETE FROM PatientRequest
DELETE FROM PharmacyRequest

GO
CREATE Procedure addSystemUser
@username varchar(20),
@password varchar(20),
@type varchar(20)
AS 
IF(NOT EXISTS (SELECT * FROM SystemUser WHERE @username = username) AND  @type<>"doctor"  AND @type<> "patient" AND @type<>"pharmacy")
BEGIN
INSERT INTO SystemUser VALUES(@username,@password)
INSERT INTO SportsAssociationManager VALUES(@sm_name,@user_name)
END






