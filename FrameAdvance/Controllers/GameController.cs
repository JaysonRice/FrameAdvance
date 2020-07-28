using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FrameAdvance.Data;
using FrameAdvance.Models;
using FrameAdvance.Repositories;

namespace FrameAdvance.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameRepository _gameRepository;
        public GameController(ApplicationDbContext context)
        {
            _gameRepository = new GameRepository(context);
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
    }
}