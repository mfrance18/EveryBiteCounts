using System.ComponentModel.DataAnnotations;

namespace EveryBiteCounts.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public string ImageLocation { get; set; }
        public int CurrentWeight { get; set; }
        public int DailyCaloricGoal { get; set; }
        public Followship Followship { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }


    }
}