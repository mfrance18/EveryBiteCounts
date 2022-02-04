using EveryBiteCounts.Models;
using EveryBiteCounts.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.AboutMe,
                               up.Email, up.ImageLocation, up.DailyCaloricGoal, up.CurrentWeight
                          FROM UserProfile up
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            DailyCaloricGoal = DbUtils.GetInt(reader, "DailyCaloricGoal"),
                            CurrentWeight = DbUtils.GetInt(reader, "CurrentWeight"),
                            AboutMe = DbUtils.GetString(reader, "AboutMe"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }
        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT up.Id, up.FirebaseUserId, up.FirstName, up.LastName, up.AboutMe,
                               up.Email, up.ImageLocation, up.DailyCaloricGoal, up.CurrentWeight
                          FROM UserProfile up
                          WHERE up.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;

                        if (reader.Read())
                        {
                            userProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                DailyCaloricGoal = DbUtils.GetInt(reader, "DailyCaloricGoal"),
                                CurrentWeight = DbUtils.GetInt(reader, "CurrentWeight"),
                                AboutMe = DbUtils.GetString(reader, "AboutMe"),
                            };

                        }
                        return userProfile;


                    }
                }
            }
        }
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, 
                                                                 Email, ImageLocation, DailyCaloricGoal, CurrentWeight, AboutMe)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName,
                                                @Email, @ImageLocation, @DailyCaloricGoal, @CurrentWeight, @AboutMe)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@DailyCaloricGoal", userProfile.DailyCaloricGoal);
                    DbUtils.AddParameter(cmd, "@CurrentWeight", userProfile.CurrentWeight);
                    DbUtils.AddParameter(cmd, "@AboutMe", userProfile.AboutMe);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<UserProfile> GetAllPotentialFriends(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *            
                        FROM UserProfile up   
                        WHERE up.Id != @id AND NOT EXISTS (
	                        SELECT * 
	                        FROM Followship f 
	                        WHERE up.Id = f.FollowingUserProfileId AND f.FollowerUserProfileId = @id
                        ) 
                        ORDER BY up.FirstName ASC";

                    DbUtils.AddParameter(cmd, "@id", userId);

                    List<UserProfile> list = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UserProfile userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            DailyCaloricGoal = DbUtils.GetInt(reader, "DailyCaloricGoal"),
                            CurrentWeight = DbUtils.GetInt(reader, "CurrentWeight"),
                            AboutMe = DbUtils.GetString(reader, "AboutMe"),
                        };
                        list.Add(userProfile);
                    }
                    reader.Close();
                    return list;
                }
            }
        }

        public List<UserProfile> GetFriends(int userId)
        {
            using(var conn = Connection )
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id as UserProfileId, up.FirebaseUserId, up.FirstName, up.LastName, up.AboutMe,
                                               up.Email, up.ImageLocation, up.DailyCaloricGoal, up.CurrentWeight, f.Id as FollowshipId
                                    FROM UserProfile up
                                    JOIN Followship f on f.FollowingUserProfileId = up.Id
                                    WHERE f.FollowerUserProfileId = @id";

                    DbUtils.AddParameter(cmd, "@id", userId);

                    List<UserProfile> friendsList = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();

                    while(reader.Read())
                    {
                        UserProfile userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            DailyCaloricGoal = DbUtils.GetInt(reader, "DailyCaloricGoal"),
                            CurrentWeight = DbUtils.GetInt(reader, "CurrentWeight"),
                            AboutMe = DbUtils.GetString(reader, "AboutMe"),
                            Followship = new Followship()
                            {
                                Id = DbUtils.GetInt(reader, "FollowshipId")
                            }
                        };
                        friendsList.Add(userProfile);

                    }
                    reader.Close();
                    return friendsList;
                }
            }
        }
    }
}
