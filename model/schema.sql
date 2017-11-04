CREATE TABLE `uni_department` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL, 
    `description` TEXT,
    CONSTRAINT UNIQUE (`name`)
) ENGINE=InnoDB;

CREATE TABLE `uni_building` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `departmentid` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL, 
    `description` TEXT,
    FOREIGN KEY(`departmentid`) REFERENCES `uni_department`(`id`),
    CONSTRAINT UNIQUE (`name`)
) ENGINE=InnoDB;

CREATE TABLE `uni_class` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `starttime` TIME,
    `endtime` TIME,
    `buildingid` INT NOT NULL,
    `departmentid` INT NOT NULL,
    FOREIGN KEY(`buildingid`) REFERENCES `uni_building`(`id`),
    FOREIGN KEY(`departmentid`) REFERENCES `uni_department`(`id`)
) ENGINE=InnoDB;

CREATE TABLE `uni_student` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    CONSTRAINT `fullname` UNIQUE (`firstname`,`lastname`)
) ENGINE=InnoDB;

CREATE TABLE `uni_class_enrollment` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `studentid` INT NOT NULL,
    `classid` INT NOT NULL,
    FOREIGN KEY(`studentid`) REFERENCES `uni_student`(`id`),
    FOREIGN KEY(`classid`) REFERENCES `uni_class`(`id`)
) ENGINE=InnoDB;

INSERT INTO uni_department (name,description) values ('computer_science','computer students only.');
INSERT INTO uni_department (name,description) values ('mechanical','mech students only.');