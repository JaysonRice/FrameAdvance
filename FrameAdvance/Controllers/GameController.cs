using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FrameAdvance.Data;
using FrameAdvance.Models;
using FrameAdvance.Repositories;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Internal;
using FrameAdvance.Models.ViewModels;

namespace FrameAdvance.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameRepository _gameRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public GameController(ApplicationDbContext context)
        {
            _gameRepository = new GameRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gameRepository.GetAll());
        }

        [HttpGet("usergames/{id}")]
        public IActionResult GetUserGames(int id)
        {
            return Ok(_gameRepository.GetUserGames(id));
        }

        [HttpGet("skills")]
        public IActionResult GetAllSkills()
        {
            return Ok(_gameRepository.GetAllSkillLevels());
        }

        [HttpPost]
        public IActionResult Post(Game game)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserTypeId != 1)
            {
                return Unauthorized();
            }

            _gameRepository.Add(game);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Game game)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserTypeId != 1)
            {
                return Unauthorized();
            }

            if (id != game.Id)
            {
                return BadRequest();
            }

            _gameRepository.Update(game);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserTypeId != 1)
            {
                return Unauthorized();
            }

            _gameRepository.Delete(id);
            return NoContent();
        }

        //Controller methods for UserGames
        [HttpPost("addgame")]
        public IActionResult Post(UserGame userGame)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != userGame.UserProfileId)
            {
                return Unauthorized();
            }

            _gameRepository.AddUserGame(userGame);
            return CreatedAtAction("Get", new { id = userGame.Id }, userGame);
        }

        [HttpPut("editusergame/{id}")]
        public IActionResult Put(int id, UserGame userGame)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != userGame.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != userGame.Id)
            {
                return BadRequest();
            }


            _gameRepository.UpdateUserGame(userGame);
            return NoContent();
        }

        [HttpDelete("removegame/{id}")]
        public IActionResult DeleteUserGame(int id)
        {

            var currentUserProfile = GetCurrentUserProfile();
            var userGame = _gameRepository.GetUserGameById(id);

            if (currentUserProfile.Id != userGame.UserProfileId)
            {
                return Unauthorized();
            }
            _gameRepository.RemoveUserGame(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}