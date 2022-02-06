using EveryBiteCounts.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Repositories
{
    public class FoodEntryRepository : BaseRepository, IFoodEntryRepository
    {
        public FoodEntryRepository(IConfiguration config) : base(config) { }

        public List<FoodEntry> GetFoodByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                cmd.CommandText = @"SELECT fe.Id as FoodEntryId, fe.[Name], fe.Calories, fe.MealTypeId, mt.Name as MealTypeName, 
                                    fe.UserProfileId, fe.CreateDateTime, up.[FirstName] as UserProfileName, up.DailyCaloricGoal
                                    FROM FoodEntry fe
                                    Left join MealType mt on mt.Id = fe.MealTypeId
                                    Left join UserProfile up on up.Id = fe.UserProfileId
                                    WHERE fe.UserProfileId = @userId
                                    ORDER BY CreateDateTime DESC";

                    var foodEntries = new List<FoodEntry>();

                    cmd.Parameters.AddWithValue("@userId", id);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        foodEntries.Add(new FoodEntry()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("FoodEntryId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Calories = reader.GetInt32(reader.GetOrdinal("Calories")),
                            MealTypeId = reader.GetInt32(reader.GetOrdinal("MealTypeId")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            MealType = new MealType()
                            {
                                Name = reader.GetString(reader.GetOrdinal("MealTypeName"))
                            },
                            UserProfile = new UserProfile()
                            {
                                FirstName = reader.GetString(reader.GetOrdinal("UserProfileName")),
                                DailyCaloricGoal = reader.GetInt32(reader.GetOrdinal("DailyCaloricGoal"))
                            }
                        });
                    }

                    reader.Close();

                    return foodEntries;
                }
            }
        }
        public FoodEntry GetFoodById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                {
                    using(var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"SELECT Id, [Name], Calories, UserProfileId, MealTypeId, CreateDateTime
                                            FROM FoodEntry
                                            WHERE Id = @id";

                        cmd.Parameters.AddWithValue("@id", id);
                        FoodEntry foodEntry = null;

                        var reader = cmd.ExecuteReader();
                        while(reader.Read())
                        {
                            if(foodEntry == null)
                            {
                                foodEntry = new FoodEntry()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Calories = reader.GetInt32(reader.GetOrdinal("Calories")),
                                    MealTypeId = reader.GetInt32(reader.GetOrdinal("MealTypeId")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                
                                };
                            }
                        }
                        reader.Close();
                        return foodEntry;
                    }
                }
            }
        }
        public void AddFoodEntry(FoodEntry foodEntry)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO FoodEntry (Name, UserProfileId, Calories, 
                                        MealTypeId, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES(@Name, @UserProfileId, @Calories, 
                                        @MealTypeId, @CreateDateTime)";

                    cmd.Parameters.AddWithValue("@Name", foodEntry.Name);
                    cmd.Parameters.AddWithValue("@UserProfileId", foodEntry.UserProfileId);
                    cmd.Parameters.AddWithValue("@Calories", foodEntry.Calories);
                    cmd.Parameters.AddWithValue("@MealTypeId", foodEntry.MealTypeId);
                    cmd.Parameters.AddWithValue("@CreateDateTime", foodEntry.CreateDateTime);

                    foodEntry.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteFoodEntry(int foodEntryId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE 
                                        FROM FoodEntry
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", foodEntryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void UpdateFoodEntry(FoodEntry foodEntry)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE FoodEntry
                                        SET 
                                            Name = @name,
                                            Calories = @calories                          
                                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", foodEntry.Name);
                    cmd.Parameters.AddWithValue("@calories", foodEntry.Calories);
                    cmd.Parameters.AddWithValue("@id", foodEntry.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
