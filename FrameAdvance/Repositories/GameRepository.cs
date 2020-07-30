using FrameAdvance.Data;
using FrameAdvance.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Repositories
{
    public class GameRepository
    {
        private readonly ApplicationDbContext _context;
        public GameRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private Game GetById(int id)
        {
            return _context.Game.FirstOrDefault(g => g.Id == id);
        }

        public List<Game> GetAll()
        {
            return _context.Game
                .Include(g => g.UserGames)
                .ThenInclude(ug => ug.UserProfile)
                .Include(g => g.UserGames)
                .ThenInclude(ug => ug.SkillLevel)
                .OrderBy(g => g.Title)
                .ToList();
        }

        public List<SkillLevel> GetAllSkillLevels()
        {
            return _context.SkillLevel
                .OrderBy(s => s.Id)
                .ToList();
        }


        public void Add(Game game)
        {
            _context.Add(game);
            _context.SaveChanges();
        }

        public void Update(Game game)
        {
            _context.Entry(game).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var game = GetById(id);
            _context.Game.Remove(game);
            _context.SaveChanges();
        }


        //UserGame repo methods start here

        private UserGame GetUserGameById(int id)
        {
            return _context.UserGame
                           .FirstOrDefault(ug => ug.Id == id);
        }

        public void AddUserGame(UserGame userGame)
        {
            _context.UserGame.Add(userGame);
            _context.SaveChanges();
        }

        public void UpdateUserGame(UserGame userGame)
        {
            _context.Entry(userGame).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void RemoveUserGame(int id)
        {
            var userGame = GetUserGameById(id);
            _context.UserGame.Remove(userGame);
            _context.SaveChanges();
        }

    }
}
