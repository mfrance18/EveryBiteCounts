USE [EveryBiteCounts];
GO

set identity_insert [MealType] on
insert into [MealType] ([Id], [Name]) 
values (1, 'Breakfast'), (2, 'Lunch'), (3, 'Dinner'), (4, 'Snacks')
set identity_insert [MealType] off

set identity_insert [Message] on
insert into [Message] ([Id], [SenderId], [ReceiverId], [MessageContent])
values (1, 1, 2, 'Hello'), (2, 2, 1, 'Hi There')
set identity_insert [Message] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, Email, CurrentWeight, DailyCaloricGoal, FirstName, LastName, ImageLocation, AboutMe) values (1, 'TcxjfL53JpemrM64s4QZFicgpSv2', 'newuser@gmail.com', 180, 1800, 'New', 'User',  'https://res.cloudinary.com/mfrance18/image/upload/v1635191829/piyed1wnh5ehtg0dp5h9.png', 'Hello New User!');
insert into UserProfile (Id, FirebaseUserId, Email, CurrentWeight, DailyCaloricGoal, FirstName, LastName, ImageLocation, AboutMe) values (2, 'cdqIVZytUPQFHGX7gir1fqblfj12', 'secondnewuser@gmail.com', 180, 1800, 'New', 'User',  'https://res.cloudinary.com/mfrance18/image/upload/v1635191829/piyed1wnh5ehtg0dp5h9.png', 'Hello New User!');
set identity_insert [UserProfile] off

set identity_insert [FoodEntry] on
insert into FoodEntry (Id, Name, UserProfileId, Calories, MealTypeId, CreateDateTime) values (1, 'Banana', 1, 92, 1, '2/4/2022 12:00:00 AM');
insert into FoodEntry (Id, Name, UserProfileId, Calories, MealTypeId, CreateDateTime) values (2, 'Banana', 2, 92, 1, '2/4/2022 12:00:00 AM');
set identity_insert [FoodEntry] off

set identity_insert [Followship] on
insert into [Followship] ([Id], [FollowerUserProfileId], [FollowingUserProfileId])
values (1, 1, 2), (2, 2, 1)
set identity_insert [Followship] off

