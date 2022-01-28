using EveryBiteCounts.Models;
using EveryBiteCounts.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EveryBiteCounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class MealTypeController : ControllerBase
    {

        private readonly IMealTypeRepository _mealTypeRepository;
        public MealTypeController (IMealTypeRepository mealTypeRepository)
        {
            _mealTypeRepository = mealTypeRepository;
        }
        // GET: api/<MealTypeController>
        [HttpGet]
        public IActionResult GetAllMealTypes()
        {
            List<MealType> mealTypes = _mealTypeRepository.GetAllMealTypes();
            return Ok(mealTypes);
        }

       
    }
}
