USE [master]

IF db_id('EveryBiteCounts') IS NULl
  CREATE DATABASE [EveryBiteCounts]
GO

USE [EveryBiteCounts]
GO


CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255),
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [CurrentWeight] int NOT NULL,
  [DailyCaloricGoal] int NOT NULL
)
GO

CREATE TABLE [FoodEntry] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [UserProfileId] int NOT NULL,
  [Calories] int NOT NULL,
  [MealTypeId] int NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [MealType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Message] (
  [Id] int PRIMARY KEY,
  [SenderId] int,
  [ReceiverId] int,
  [MessageContent] nvarchar(255)
)
GO

CREATE TABLE [Followship] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FollowerUserProfileId] int NOT NULL,
  [FollowingUserProfileId] int NOT NULL
)
GO

ALTER TABLE [FoodEntry] ADD FOREIGN KEY ([MealTypeId]) REFERENCES [MealType] ([Id])
GO

ALTER TABLE [FoodEntry] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Followship] ADD FOREIGN KEY ([FollowerUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Followship] ADD FOREIGN KEY ([FollowingUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([SenderId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([ReceiverId]) REFERENCES [UserProfile] ([Id])
GO
