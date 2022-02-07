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
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public MessageController(IMessageRepository messageRepository, IUserProfileRepository userProfileRepository)
        {
            _messageRepository = messageRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("GetMyMessages")]
        public IActionResult GetMyMessages()
        {
            var userId = GetCurrentUserProfile().Id;
            var messages = _messageRepository.GetMessagesByUserId(userId);
            return Ok(messages);
        }

        [HttpPost]
        public IActionResult Post(Message message)
        {
            var senderId = GetCurrentUserProfile().Id;
            message.SenderId = senderId;
            _messageRepository.AddMessage(message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _messageRepository.DeleteMessage(id);

        }

        [HttpPut]
        public IActionResult Edit(Message message)
        {
            _messageRepository.EditMessage(message);
            return NoContent();         
        }








        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
