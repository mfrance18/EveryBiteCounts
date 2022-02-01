using EveryBiteCounts.Models;
using EveryBiteCounts.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EveryBiteCounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodEntryController : ControllerBase
    {
        private readonly IFoodEntryRepository _foodEntryRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public FoodEntryController(IFoodEntryRepository foodEntryRepository, IUserProfileRepository userProfileRepository)
        {
            _foodEntryRepository = foodEntryRepository;
            _userProfileRepository = userProfileRepository;
        }
      
        [HttpGet("GetMyFoods")]
        public IActionResult GetFoodByUserId()
        {
            var userId = GetCurrentUserProfile().Id;
            var foodEntries = _foodEntryRepository.GetFoodByUserId(userId);
            return Ok(foodEntries);
        }

        // GET api/<FoodEntryController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var foodEntry = _foodEntryRepository.GetFoodById(id);
            return Ok(foodEntry);
        }

        // POST api/<FoodEntryController>
        [HttpPost]
        public IActionResult Post(FoodEntry foodEntry)
        {
            
            var userId = GetCurrentUserProfile().Id;
            foodEntry.UserProfileId = userId;
            _foodEntryRepository.AddFoodEntry(foodEntry);
            return CreatedAtAction("Get", new { id = foodEntry.Id }, foodEntry);
        }

        // PUT api/<FoodEntryController>/5
        [HttpPut]
        public IActionResult Put( FoodEntry foodEntry)
        {
           
            _foodEntryRepository.UpdateFoodEntry(foodEntry);
            return NoContent();
        }

        // DELETE api/<FoodEntryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _foodEntryRepository.DeleteFoodEntry(id);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
