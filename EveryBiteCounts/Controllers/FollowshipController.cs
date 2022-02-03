using EveryBiteCounts.Models;
using EveryBiteCounts.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EveryBiteCounts.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FollowshipController : ControllerBase
    {
        private readonly IFollowshipRepository _followShipRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FollowshipController(IFollowshipRepository followshipRepository, IUserProfileRepository userProfileRepository)
        {
            _followShipRepository = followshipRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost]
        public IActionResult Post(Followship followShip)
        {
            var followerId = GetCurrentUserProfile().Id;
            followShip.FollowerUserProfileId = followerId;
            _followShipRepository.Add(followShip);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _followShipRepository.Delete(id);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
