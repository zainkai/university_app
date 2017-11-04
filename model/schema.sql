CREATE TABLE `fp_building` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL, 
    `description` TEXT,
    CONSTRAINT UNIQUE (`name`)
) ENGINE=InnoDB;

CREATE TABLE `fp_department` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `buildingid` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL, 
    `description` TEXT,
    FOREIGN KEY(`buildingid`) REFERENCES `fp_building`(`id`),
    CONSTRAINT UNIQUE (`name`)
) ENGINE=InnoDB;

CREATE TABLE `fp_class` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `starttime` TIME,
    `endtime` TIME,
    `buildingid` INT NOT NULL,
    `departmentid` INT NOT NULL,
    FOREIGN KEY(`buildingid`) REFERENCES `fp_building`(`id`),
    FOREIGN KEY(`departmentid`) REFERENCES `fp_department`(`id`)
) ENGINE=InnoDB;

CREATE TABLE `fp_student` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `fp_class_enrollment` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `studentid` INT NOT NULL,
    `classid` INT NOT NULL,
    FOREIGN KEY(`studentid`) REFERENCES `fp_student`(`id`),
    FOREIGN KEY(`classid`) REFERENCES `fp_class`(`id`)
) ENGINE=InnoDB;

