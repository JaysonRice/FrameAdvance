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
    public class GameController : ControllerBase
    {
        private readonly GameRepository _gameRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public GameController(ApplicationDbContext context)
        {
            _gameRepository = new GameRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gameRepository.GetAll());
        }

        [HttpGet("skills")]
        public IActionResult GetAllSkills()
        {
            return Ok(_gameRepository.GetAllSkillLevels());
        }

        [HttpPost]
        public IActionResult Post(Game game)
        {
            _gameRepository.Add(game);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Game game)
        {
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
            _gameRepository.Delete(id);
            return NoContent();
        }

        //Controller methods for UserGames
        [HttpPost("addgame")]
        public IActionResult Post(UserGame userGame)
        {
            _gameRepository.AddUserGame(userGame);
            return CreatedAtAction("Get", new { id = userGame.Id }, userGame);
        }

        [HttpPut("editusergame/{id}")]
        public IActionResult Put(int id, UserGame userGame)
        {
            if (id != userGame.Id)
            {
                return BadRequest();
            }

            _gameRepository.UpdateUserGame(userGame);
            return NoContent();
        }

        [HttpDelete("removegame/{id}")]
        public IActionResult DeletePostTag(int id)
        {
            _gameRepository.RemoveUserGame(id);
            return NoContent();
        }


    }
}