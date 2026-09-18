-- 6810545794 Pasin Makcharoen

create database SIMULATION_DATABASE_6810545794;
use SIMULATION_DATABASE_6810545794;

create table School(
	schID varchar(10) primary key,
    schName varchar(50),
    schStatus varchar(30),
    schOrganization varchar(30),
    schRegister date
);

create table Student(
	stuID varchar(10) primary key,
    schID varchar(10),
    sName varchar(50),
    sStatus varchar(20),
    sGPAX float,
    curriculum varchar(30),
    createdAt date,

    foreign key (schID) references School(schID)
);

create table Teacher(
	tID varchar(10) primary key,
    schID varchar(10),
    tName varchar(50),
    curriculum varchar(30),
    tStatus varchar(20),
    createdAt date,
    
    foreign key (schID) references School(schID) 
);

create table AvaliableSubjects(
    subjectID varchar(10) primary key,
    subjectName varchar(50),
    credits varchar(1)
);

create table Enrollment(
    stuID varchar(10),
    subjectID varchar(10),
    enrollDate date,
    grade float,
    
    primary key (stuID, subjectID),
    foreign key (stuID) references Student(stuID),
    foreign key (subjectID) references AvaliableSubjects(subjectID)
);

INSERT INTO School (schID, schName, schStatus, schOrganization, schRegister) VALUES
('100', 'Binary School', 'operating', 'private', '2015-06-01'),
('101', 'Saipanya Rangsit', 'operating', 'government', '2000-02-10'),
('102', 'Oak Creek', 'closed', 'private', '2000-03-30'),
('103', 'Rhods Junior High', 'closed', 'government', '2015-06-01'),
('104', 'Sareen High', 'operating', 'private', '2020-06-01'),
('105', 'Kasetsart High', 'operating', 'government', '2020-06-01');

INSERT INTO Student (stuID, schID, sName, sStatus, sGPAX, curriculum, createdAt) VALUES
('10001', '100', 'David Brook', 'undergraduate', 3.42, 'math-science', '2023-06-01'),
('10002', '100', 'Plummet Makchar', 'graduated', 3.78, 'math-science', '2019-08-15'),
('10003', '100', 'Bross Brew', 'undergraduate', 2.65, 'thai-social', '2024-06-10'),
('20001', '101', 'Themos Thomas', 'undergraduate', 3.15, 'math-science', '2022-06-05'),
('20002', '101', 'Khen Dias', 'graduated', 3.91, 'gifted', '2018-09-01'),
('20003', '101', 'Sarah Grimor', 'graduated', 3.34, 'math-science', '2020-06-20'),
('30001', '102', 'Sooth Booth', 'undergraduate', 2.88, 'thai-social', '2023-08-25');

INSERT INTO Teacher (tID, schID, tName, curriculum, tStatus, createdAt) VALUES
('11001', '100', 'Robert Tuff', 'gifted', 'station', '2018-05-10'),
('11002', '100', 'Vuga Huge', 'math-science', 'outoffservice', '2015-09-01'),
('12001', '101', 'Sam Velvert', 'thai-social', 'station', '2020-01-20'),
('12002', '101', 'Nira Chan', 'gifted', 'station', '2019-06-15'),
('13001', '102', 'Wit Suksan', 'math-science', 'station', '2021-08-01');

INSERT INTO AvaliableSubjects (subjectID, subjectName, credits) VALUES
('201', 'math', 3),
('202', 'science', 3),
('203', 'thai', 2),
('204', 'social', 1),
('205', 'english', 2);

INSERT INTO Enrollment (stuID, subjectID, enrollDate, grade) VALUES
('10001', '201', '2023-06-01', 4),
('10001', '202', '2023-06-01', 3),
('10002', '201', '2019-08-15', 2),
('10002', '202', '2019-08-15', 4),
('10003', '203', '2024-06-10', 2),
('10003', '204', '2024-06-10', 2),
('20001', '201', '2022-06-05', 3),
('20001', '202', '2022-06-05', 4),
('20002', '201', '2018-09-01', 1),
('20002', '205', '2018-09-01', 4),
('20003', '202', '2020-06-20', 1),
('30001', '203', '2023-08-25', 3);

select s.sName, s.sGPAX, s.curriculum, s.sStatus, sch.schOrganization
from School sch join Student s on s.schID = sch.schID
where s.curriculum = 'math-science' and sch.schOrganization = 'government';

select sch.schName, count(t.tID) as Total_Teachers
from School sch join Teacher t on sch.schID = t.schID
group by sch.schID;

select ava.subjectName, ava.credits, count(en.stuID) as Total_Studnets_Enrolled
from AvaliableSubjects ava join Enrollment en on ava.subjectID = en.subjectID
group by ava.subjectID
having count(en.stuID) >= 2
order by ava.credits DESC;

select s.sName, s.sGPAX, (select round(avg(s.sGPAX), 2) from Student s) as AVG_GPAX from Student s
where s.sGPAX >= (select avg(s.sGPAX) from Student s);

select ava.subjectName, avg(en.grade) as AVG_GRADE, count(en.stuID) as TOTAL_STUDENTS
from AvaliableSubjects ava join Enrollment en on ava.subjectID = en.subjectID
group by en.subjectID;

-- select * from Student;
-- select * from School where schID = "101";

-- alter table Enrollment modify grade float;

-- drop database SIMULATION_DATABASE_6810545794;