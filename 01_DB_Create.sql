USE [master]

IF db_id('FrameAdvance') IS NULl
  CREATE DATABASE [FrameAdvance]
GO

USE [FrameAdvance]
GO

DROP TABLE IF EXISTS [ReviewPostCharacter];
DROP TABLE IF EXISTS [SavedReview];
DROP TABLE IF EXISTS [UserGame];
DROP TABLE IF EXISTS [SkillLevel];
DROP TABLE IF EXISTS [Character];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Timestamp];
DROP TABLE IF EXISTS [ReviewPost];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Game];
GO

CREATE TABLE [UserProfile] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] varchar(28) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [Username] varchar(50) NOT NULL,
  [UserTypeId] integer NOT NULL
)
GO

CREATE TABLE [ReviewPost] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Title] varchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [VideoLocation] nvarchar(255) NOT NULL,
  [Private] bit NOT NULL DEFAULT 0,
  [UserProfileId] integer NOT NULL,
  [GameId] integer NOT NULL
)
GO

CREATE TABLE [Timestamp] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Time] integer NOT NULL,
  [ReviewPostId] integer NOT NULL,
  [Notes] nvarchar(255)
)
GO

CREATE TABLE [Comment] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Content] varchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ReviewPostId] integer NOT NULL,
  [UserProfileId] integer NOT NULL
)
GO

CREATE TABLE [Game] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Title] varchar(255) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL,
  [IsActive] bit NOT NULL DEFAULT 1
)
GO

CREATE TABLE [Character] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Name] varchar(50) NOT NULL,
  [GameId] integer NOT NULL
)
GO

CREATE TABLE [UserType] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Name] varchar(50) NOT NULL
)
GO

CREATE TABLE [UserGame] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [SkillLevelId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [GameId] integer NOT NULL
)
GO

CREATE TABLE [SkillLevel] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [Name] varchar(50) NOT NULL
)
GO

CREATE TABLE [SavedReview] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [UserProfileId] integer NOT NULL,
  [ReviewPostId] integer NOT NULL
)
GO

CREATE TABLE [ReviewPostCharacter] (
  [Id] integer IDENTITY PRIMARY KEY NOT NULL,
  [CharacterId] integer NOT NULL,
  [ReviewPostId] integer NOT NULL
)
GO

ALTER TABLE [ReviewPost] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [SavedReview] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [SavedReview] ADD FOREIGN KEY ([ReviewPostId]) REFERENCES [ReviewPost] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [UserGame] ADD FOREIGN KEY ([SkillLevelId]) REFERENCES [SkillLevel] ([Id])
GO

ALTER TABLE [UserGame] ADD FOREIGN KEY ([GameId]) REFERENCES [Game] ([Id])
GO

ALTER TABLE [UserGame] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Character] ADD FOREIGN KEY ([GameId]) REFERENCES [Game] ([Id])
GO

ALTER TABLE [ReviewPost] ADD FOREIGN KEY ([GameId]) REFERENCES [Game] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([ReviewPostId]) REFERENCES [ReviewPost] ([Id])
GO

ALTER TABLE [Timestamp] ADD FOREIGN KEY ([ReviewPostId]) REFERENCES [ReviewPost] ([Id])
GO

ALTER TABLE [ReviewPostCharacter] ADD FOREIGN KEY ([ReviewPostId]) REFERENCES [ReviewPost] ([Id])
GO

ALTER TABLE [ReviewPostCharacter] ADD FOREIGN KEY ([CharacterId]) REFERENCES [Character] ([Id])
GO

set identity_insert [UserType] on
insert into UserType (Id, [Name]) VALUES (1, 'Admin'), (2, 'Author');
set identity_insert [UserType] off


set identity_insert [SkillLevel] on
insert into [SkillLevel] ([ID], [Name]) VALUES (1, 'Beginner'), (2, 'Intermediate'), (3, 'Advanced'), (4, 'Expert');
set identity_insert [SkillLevel] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, Email, Username, UserTypeId) values (1, 'gOW3xB9Cu3hqOzOAq1S8lvcUo313', 'jayson@gmail.com', 'JaysonMoistRice', 1);
insert into UserProfile (Id, FirebaseUserId, Email, Username, UserTypeId) values (2, '6exPGZJTSRefiS2hANXJjuEPkmB3', 'ryan@gmail.com', 'RentPayingReeves', 2);
insert into UserProfile (Id, FirebaseUserId, Email, Username, UserTypeId) values (3, '21f2AIJ2y5Xo8poJoMsqUnzJycY2', 'brett@gmail.com', 'Mr. Unoriginal', 2);
insert into UserProfile (Id, FirebaseUserId, Email, Username, UserTypeId) values (4, 'Z0OwfuPDSKYmchnJo9DLuH7DVxO2', 'jon@gmail.com', 'dekillsage', 2);
insert into UserProfile (Id, FirebaseUserId, Email, Username, UserTypeId) values (5, 'qHh4sPkbTseKLNhu2HOimYpkhq12', 'magnus@gmail.com', 'Magnus Carlsen', 2);
insert into UserProfile (Id, FirebaseUserId, Email, Username, UserTypeId) values (6, '9cgbgMNRncVmNb0pm1Ox3pCM1jz1', 'victor@gmail.com', 'Punk', 2);
set identity_insert [UserProfile] off

set identity_insert [Game] on
insert into [Game] ([ID], [ImageLocation], [Title]) VALUES (1, 'https://i.imgur.com/ByfIe02.png', 'Chess'), (2, 'https://i.imgur.com/GMi1fyp.png', 'DragonBall FighterZ'), (3, 'https://i.imgur.com/whwxBvL.png', 'Super Smash Bros Melee'), (4, 'https://i.imgur.com/eC7wVTC.png', 'Street Fighter V');
set identity_insert [Game] off

set identity_insert [ReviewPost] on
insert into ReviewPost (Id, Title, CreateDateTime, VideoLocation, [Private], UserProfileId, GameId) values (1, 'ADS 9 - Grab (Marth) VS Moist (Falcon), Oct 2018', '2020-7-24', 'https://www.youtube.com/watch?v=1Mvb5wp5GWU', 0, 1, 3);
insert into ReviewPost (Id, Title, CreateDateTime, VideoLocation, [Private], UserProfileId, GameId) values (2, 'GO1 Vs Dekillsage, DBFZ World Tour Finals Feb 2020', '2020-7-23', 'https://www.youtube.com/watch?v=wfBx4KaMlPk', 0, 4, 2);
insert into ReviewPost (Id, Title, CreateDateTime, VideoLocation, [Private], UserProfileId, GameId) values (3, 'Tokido (Akuma) vs  Punk (Karin) - NCR 2019', '2020-7-21', 'https://www.youtube.com/watch?v=GUaMzREbqBI', 0, 6, 4);
insert into ReviewPost (Id, Title, CreateDateTime, VideoLocation, [Private], UserProfileId, GameId) values (4, 'Magnus vs Nakamura Speed Chess Championship 2017', '2019-8-13', 'https://www.youtube.com/watch?v=FRl7iSADOIY', 0, 5, 1);
set identity_insert [ReviewPost] off

set identity_insert [Timestamp] on
insert into Timestamp (Id, [Time], ReviewPostId, Notes) values (1, 894, 1, 'If you want to shield stop vs Marth at high percent, make sure to hold it long enough to block or retreat. Attacking out of shield is too slow at this point and I''d rather get grabbed if I''m going to lose the mixup anyways.');
insert into Timestamp (Id, [Time], ReviewPostId, Notes) values (2, 491, 2, 'Play more patient in this situation with the life lead. No reason to get opened up by projectiles when it''s just a mirror match.');
insert into Timestamp (Id, [Time], ReviewPostId, Notes) values (3, 894, 3, 'Don''t go for this anti air after getting thrown. Tokido will do the jump in at the right time to not be caught by it. Be patient and try to block the mixup.');
insert into Timestamp (Id, [Time], ReviewPostId, Notes) values (4, 920, 4, 'Simply make the best move every time.');
set identity_insert [Timestamp] off

set identity_insert [SavedReview] on
insert into SavedReview (Id, UserProfileId, ReviewPostId) values (1, 1, 2);
set identity_insert [SavedReview] off

set identity_insert [UserGame] on
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (1, 3, 1, 3);
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (2, 1, 1, 1);
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (3, 4, 5, 1);
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (4, 2, 2, 1);
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (5, 3, 3, 3);
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (6, 4, 4, 2);
insert into UserGame ([ID], [SkillLevelId], [UserProfileId], [GameId]) VALUES (7, 4, 6, 4);
set identity_insert [UserGame] off

set identity_insert [Character] on
insert into Character ([ID], [Name], [GameId]) VALUES (1, 'Dr. Mario', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (2, 'Mario', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (3, 'Luigi', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (4, 'Bowser', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (5, 'Peach', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (6, 'Yoshi', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (7, 'DK', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (8, 'Captain Falcon', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (9, 'Ganondorf', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (10, 'Young Link', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (11, 'Link', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (12, 'Zelda', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (13, 'Sheik', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (14, 'Samus', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (15, 'Kirby', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (16, 'Ice Climbers', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (17, 'Ness', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (18, 'Fox', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (19, 'Falco', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (20, 'Pichu', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (21, 'Pikachu', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (22, 'Jigglypuff', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (23, 'Mewtwo', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (24, 'G&W', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (25, 'Marth', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (26, 'Roy', 3);
insert into Character ([ID], [Name], [GameId]) VALUES (27, 'Android 16', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (28, 'Android 18', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (29, 'Android 21', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (30, 'Beerus', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (31, 'Captain Ginyu', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (32, 'Cell', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (33, 'Frieza', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (34, 'Gohan (Teen)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (35, 'Gohan (Adult)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (36, 'Goku (Super Saiyan)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (37, 'Goku Black', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (38, 'Gotenks', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (39, 'Hit', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (40, 'Kid Buu', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (41, 'Krillin', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (42, 'Majin Buu', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (43, 'Nappa', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (44, 'Piccolo', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (45, 'Tien', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (46, 'Trunks', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (47, 'Vegeta (Super Saiyan)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (48, 'Vegeta (SSGSS)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (49, 'Yamcha', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (50, 'Goku (SSGSS)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (51, 'Android 17', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (52, 'Bardock', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (53, 'Broly', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (54, 'Cooler', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (55, 'Goku (Base)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (56, 'Vegeta (Base)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (57, 'Vegito (SSGSS)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (58, 'Zamasu (Fused)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (59, 'Broly (DBS)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (60, 'Gogeta (SSGSS)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (61, 'Goku (GT)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (62, 'Janemba', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (63, 'Jiren', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (64, 'Videl', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (65, 'Goku (Ultra Instinct)', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (66, 'Kefla', 2);
insert into Character ([ID], [Name], [GameId]) VALUES (67, 'Ryu', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (68, 'Chun-Li', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (69, 'Nash', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (70, 'M. Bison', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (71, 'Cammie', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (72, 'Birdie', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (73, 'Ken', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (74, 'Necalli', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (75, 'Vega', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (76, 'R. Mika', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (77, 'Rashid', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (78, 'Karin', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (79, 'Zangeif', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (80, 'Laura', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (81, 'Dhalsim', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (82, 'F.A.N.G.', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (83, 'Alex', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (84, 'Guile', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (85, 'Ibuki', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (86, 'Balrog', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (87, 'Juri', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (88, 'Urien', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (89, 'Akuma', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (90, 'Kolin', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (91, 'Ed', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (92, 'Abigail', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (93, 'Menat', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (94, 'Zeku', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (95, 'Sakura', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (96, 'Blanka', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (97, 'Falke', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (98, 'Cody', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (99, 'G', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (100, 'Sagat', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (101, 'Kage', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (102, 'E. Honda', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (103, 'Lucia', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (104, 'Poison', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (105, 'Gill', 4);
insert into Character ([ID], [Name], [GameId]) VALUES (106, 'Seth', 4);
set identity_insert [Character] off

set identity_insert [ReviewPostCharacter] on
insert into ReviewPostCharacter (Id, CharacterId, [ReviewPostId]) values (1, 8, 1);
insert into ReviewPostCharacter (Id, CharacterId, ReviewPostId) values (2, 25, 1);
insert into ReviewPostCharacter (Id, CharacterId, ReviewPostId) values (3, 78, 3);
insert into ReviewPostCharacter (Id, CharacterId, ReviewPostId) values (4, 89, 3);
set identity_insert [ReviewPostCharacter] off
