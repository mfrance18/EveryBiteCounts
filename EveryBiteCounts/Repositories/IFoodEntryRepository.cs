using EveryBiteCounts.Models;
using System.Collections.Generic;

namespace EveryBiteCounts.Repositories
{
    public interface IFoodEntryRepository
    {
        List<FoodEntry> GetFoodByUserId(int id);
        FoodEntry GetFoodById(int id);
        void AddFoodEntry(FoodEntry foodEntry);
        void DeleteFoodEntry(int foodEntryId);
        void UpdateFoodEntry(FoodEntry foodEntry);
    }
}