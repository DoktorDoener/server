CREATE TABLE Person (	name varchar(50),
						vorname varchar(50),
						plz int,
						strasse varchar(50)
						CONSTRAINT check_name_vorname CHECK ((name, vorname) IS UNIQUE)
						CONSTRAINT check_plz CHECK(Plzort CONTAINS Person.plz)
					)
					
CREATE TABLE Plzort(
					plz int,
					ort varchar(50)
					CONSTRAINT check_ort CHECK( ort NOT NULL) 
					)
					
					
SELECT nr FROM Person WHERE (COUNT(* IS NULL) >=1;

SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMN WHERE TABLE_NAME in ('') 