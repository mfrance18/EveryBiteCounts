using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Models
{
    public class FoodEntry
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public int UserProfileId { get; set; }
        [Required]
        public int Calories { get; set; }
        [Required]
        public int MealTypeId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public UserProfile UserProfile { get; set; }
        public MealType MealType { get; set; }
        
    }
}
