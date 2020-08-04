using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FrameAdvance.Data;
using FrameAdvance.Models;
using FrameAdvance.Repositories;
using System.Security.Claims;

namespace FrameAdvance.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly CharacterRepository _characterRepository;
        private readonly ReviewPostRepository _reviewPostRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public CharacterController(ApplicationDbContext context)
        {
            _characterRepository = new CharacterRepository(context);
            _reviewPostRepository = new ReviewPostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_characterRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetByGame(int id)
        {
            return Ok(_characterRepository.GetByGameId(id));
        }


        [HttpPost("addcharacter")]
        public IActionResult Post(ReviewPostCharacter reviewPostCharacter)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var currentPost = _reviewPostRepository.GetById(reviewPostCharacter.ReviewPostId);

            if (currentUserProfile.Id != currentPost.UserProfileId)
            {
                return Unauthorized();
            }

            _characterRepository.AddCharacterToPost(reviewPostCharacter);
            return CreatedAtAction("Get", new { id = reviewPostCharacter.Id }, reviewPostCharacter);
        }

        [HttpDelete("removecharacter/{id}")]
        public IActionResult DeleteSavedReview(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var postCharacter = _characterRepository.GetPostCharaterById(id);
            var currentPost = _reviewPostRepository.GetById(postCharacter.ReviewPostId);

            if (currentUserProfile.Id != currentPost.UserProfileId)
            {
                return Unauthorized();
            }

            _characterRepository.RemoveCharacterFromPost(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Character character)
        {
            _characterRepository.Add(character);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Character character)
        {
            if (id != character.Id)
            {
                return BadRequest();
            }

            _characterRepository.Update(character);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _characterRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}