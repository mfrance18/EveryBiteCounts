using EveryBiteCounts.Models;
using System.Collections.Generic;

namespace EveryBiteCounts.Repositories
{
    public interface IFoodEntryRepository
    {
        List<FoodEntry> GetFoodByUserId(int id);
    }
}