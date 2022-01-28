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
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FoodEntryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FoodEntryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FoodEntryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
