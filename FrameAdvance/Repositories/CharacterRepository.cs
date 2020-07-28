using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameAdvance.Data;
using FrameAdvance.Models;
using Microsoft.EntityFrameworkCore;

namespace FrameAdvance.Repositories
{
    public class CharacterRepository
    {
        private readonly ApplicationDbContext _context;
        public CharacterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private Character GetById(int id)
        {
            return _context.Character.FirstOrDefault(c => c.Id == id);
        }

        private List<Character> GetByGameId(int gameId)
        {
            return _context.Character
                .Where(c => c.GameId == gameId)
                .OrderBy(c => c.Name)
                .ToList();
        }

        public void Add(Character character)
        {
            _context.Add(character);
            _context.SaveChanges();
        }

        public void Update(Character character)
        {
            _context.Entry(character).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var character = GetById(id);
            _context.Character.Remove(character);
            _context.SaveChanges();
        }
    }
}
