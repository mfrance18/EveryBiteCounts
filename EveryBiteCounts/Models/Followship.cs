using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Models
{
    public class Followship
    {
        public int FollowerUserProfileId { get; set; }
        public int FollowingUserProfileId { get; set; }
    }
}
