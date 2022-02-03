using EveryBiteCounts.Models;

namespace EveryBiteCounts.Repositories
{
    public interface IFollowshipRepository
    {
        void Add(Followship followShip);
        void Delete(int followShipId);
    }
}