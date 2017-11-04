-- initialize department tabel
INSERT INTO uni_department (name,description) values ('computer_science','everything and anything binary');
INSERT INTO uni_department (name,description) values ('mechanical','tons of physics and math');
INSERT INTO uni_department (name,description) values ('buisness','fallback majors');

-- initialize buildings tabel
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
