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
    public class CharacterController : ControllerBase
    {
        private readonly CharacterRepository _characterRepository;
        public CharacterController(ApplicationDbContext context)
        {
            _characterRepository = new CharacterRepository(context);
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
    }
}