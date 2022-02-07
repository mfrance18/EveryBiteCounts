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
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("GetCurrentUser")]
        public IActionResult GetUserProfileById()
        {
            var currentUserId = GetCurrentUserProfile().Id;
            return Ok(_userProfileRepository.GetUserProfileById(currentUserId));
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetUserById(int id)
        {
            var userProfile = _userProfileRepository.GetUserById(id);
            return Ok(userProfile);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("GetAllProfiles")]
        public IActionResult GetAllProfiles()
        {
            var currentUserId = GetCurrentUserProfile().Id; 
            List<UserProfile> profiles = _userProfileRepository.GetAllPotentialFriends(currentUserId);
            return Ok(profiles);
        }

        [HttpGet("GetFriends")]
        public IActionResult GetUserFriends()
        {
            var userId = GetCurrentUserProfile().Id;
            List<UserProfile> friends = _userProfileRepository.GetFriends(userId);
            return Ok(friends);
        }


        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut]
        public IActionResult Put(UserProfile userProfile)
        {
            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
