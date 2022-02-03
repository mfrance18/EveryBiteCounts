using EveryBiteCounts.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Repositories
{
    public class FollowshipRepository : BaseRepository, IFollowshipRepository
    {
        public FollowshipRepository(IConfiguration config) : base(config) { }

        public void Add(Followship followShip)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Followship(FollowerUserProfileId, FollowingUserProfileId)
                                        OUTPUT INSERTED.Id
                                        VALUES(@FollowerUserProfileId, @FollowingUserProfileId)";

                    cmd.Parameters.AddWithValue("@FollowerUserProfileId", followShip.FollowerUserProfileId);
                    cmd.Parameters.AddWithValue("@FollowingUserProfileId", followShip.FollowingUserProfileId);

                    followShip.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int followShipId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE
                                        FROM Followship
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", followShipId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
