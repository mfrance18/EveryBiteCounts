using EveryBiteCounts.Models;
using System.Collections.Generic;

namespace EveryBiteCounts.Repositories
{
    public interface IMealTypeRepository
    {
        List<MealType> GetAllMealTypes();
    }
}