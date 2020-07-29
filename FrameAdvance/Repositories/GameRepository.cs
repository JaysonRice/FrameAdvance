﻿using FrameAdvance.Data;
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

        public List<ReviewPost> postversion(int id)
        {
            return _context.ReviewPost
                           .Include(p => p.UserProfile)
                           .Include(p => p.Game)
                           .Include(p => p.ReviewPostCharacters)
                           .ThenInclude(pc => pc.Character)
                           .Where(p => p.UserProfileId == id)
                           .OrderByDescending(p => p.CreateDateTime)
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
    }
}
