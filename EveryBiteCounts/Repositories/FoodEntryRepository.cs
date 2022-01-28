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
                    cmd.CommandText = @"
                       SELECT fe.Id as FoodEntryId, fe.[Name], fe.Calories, fe.MealTypeId, mt.Name as MealTypeName, fe.UserProfileId, fe.CreateDateTime
                        FROM FoodEntry fe
                        Left join MealType mt on mt.Id = fe.MealTypeId
                        WHERE fe.UserProfileId = @userId";

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
                            }
                        });
                    }

                    reader.Close();

                    return foodEntries;
                }
            }
        }
    }
}
