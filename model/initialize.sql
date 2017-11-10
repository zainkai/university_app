-- initialize department table
INSERT INTO uni_department (name,description) values ('computer_science','everything and anything binary');
INSERT INTO uni_department (name,description) values ('mechanical','tons of physics and math');
INSERT INTO uni_department (name,description) values ('buisness','fallback majors');

-- initialize buildings table
INSERT INTO uni_building (departmentid,name,description) values (
    (SELECT id FROM uni_department WHERE name='computer_science'),
    "kelly",
    "green energy building"    
);

INSERT INTO uni_building (departmentid,name,description) values (
    (SELECT id FROM uni_department WHERE name='mechanical'),
    "rogers",
    "the castle looking building"    
);

INSERT INTO uni_building (departmentid,name,description) values (
    (SELECT id FROM uni_department WHERE name='buisness'),
    "austin",
    "that one building next to linc"    
);

--initialize class table
INSERT INTO uni_class (departmentid,buildingid,name,starttime,endtime) values(
    (SELECT id FROM uni_department WHERE name='computer_science'),
    (SELECT id FROM uni_building WHERE name='kelly'),
    'intro_to_databases',
    '13:00:00',
    '14:50:00'
);

INSERT INTO uni_class (departmentid,buildingid,name,starttime,endtime) values(
    (SELECT id FROM uni_department WHERE name='mechanical'),
    (SELECT id FROM uni_building WHERE name='austin'),
    'heat_transfer',
    '08:00:00',
    '08:50:00'
);

INSERT INTO uni_class (departmentid,buildingid,name,starttime,endtime) values(
    (SELECT id FROM uni_department WHERE name='buisness'),
    (SELECT id FROM uni_building WHERE name='austin'),
    'microeconomics',
    '12:00:00',
    '13:50:00'
);

