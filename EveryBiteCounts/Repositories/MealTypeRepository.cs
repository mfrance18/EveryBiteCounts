using EveryBiteCounts.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Repositories
{
    public class MealTypeRepository : BaseRepository, IMealTypeRepository
    {
        public MealTypeRepository(IConfiguration config) : base(config) { }

        public List<MealType> GetAllMealTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM MealType";

                    var mealTypes = new List<MealType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        mealTypes.Add(new MealType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }
                    reader.Close();
                    return mealTypes;
                }
            }
        }
    }
}
