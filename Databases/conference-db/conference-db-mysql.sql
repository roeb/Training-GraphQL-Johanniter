CREATE DATABASE IF NOT EXISTS conference;
USE conference;


START TRANSACTION;

CREATE TABLE `Attendees` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `FirstName` nvarchar(200) NOT NULL,
    `LastName` nvarchar(200) NOT NULL,
    `UserName` nvarchar(200) NOT NULL,
    `EmailAddress` nvarchar(256) NULL,
    CONSTRAINT `PK_Attendees` PRIMARY KEY (`Id`)
);

CREATE TABLE `Speakers` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` nvarchar(200) NOT NULL,
    `Bio` nvarchar(4000) NULL,
    `WebSite` nvarchar(1000) NULL,
    CONSTRAINT `PK_Speakers` PRIMARY KEY (`Id`)
);

CREATE TABLE `Tracks` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` nvarchar(200) NOT NULL,
    CONSTRAINT `PK_Tracks` PRIMARY KEY (`Id`)
);

CREATE TABLE `Sessions` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Title` nvarchar(200) NOT NULL,
    `Abstract` nvarchar(4000) NULL,
    `StartTime` TIMESTAMP NULL,
    `EndTime` TIMESTAMP NULL,
    `TrackId` int NULL,
    CONSTRAINT `PK_Sessions` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Sessions_Tracks_TrackId` FOREIGN KEY (`TrackId`) REFERENCES `Tracks` (`Id`) ON DELETE RESTRICT
);

CREATE TABLE `SessionAttendee` (
    `SessionId` int NOT NULL,
    `AttendeeId` int NOT NULL,
    CONSTRAINT `PK_SessionAttendee` PRIMARY KEY (`SessionId`, `AttendeeId`),
    CONSTRAINT `FK_SessionAttendee_Attendees_AttendeeId` FOREIGN KEY (`AttendeeId`) REFERENCES `Attendees` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_SessionAttendee_Sessions_SessionId` FOREIGN KEY (`SessionId`) REFERENCES `Sessions` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `SessionSpeaker` (
    `SessionId` int NOT NULL,
    `SpeakerId` int NOT NULL,
    CONSTRAINT `PK_SessionSpeaker` PRIMARY KEY (`SessionId`, `SpeakerId`),
    CONSTRAINT `FK_SessionSpeaker_Sessions_SessionId` FOREIGN KEY (`SessionId`) REFERENCES `Sessions` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_SessionSpeaker_Speakers_SpeakerId` FOREIGN KEY (`SpeakerId`) REFERENCES `Speakers` (`Id`) ON DELETE CASCADE
);

CREATE UNIQUE INDEX `IX_Attendees_UserName` ON `Attendees` (`UserName`);

CREATE INDEX `IX_SessionAttendee_AttendeeId` ON `SessionAttendee` (`AttendeeId`);

CREATE INDEX `IX_Sessions_TrackId` ON `Sessions` (`TrackId`);

CREATE INDEX `IX_SessionSpeaker_SpeakerId` ON `SessionSpeaker` (`SpeakerId`);

COMMIT;