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

        public List<Character> GetAll()
        {
            return _context.Character
                .OrderBy(c => c.Name)
                .ToList();
        }

        public Character GetById(int id)
        {
            return _context.Character.FirstOrDefault(c => c.Id == id);
        }

        public List<Character> GetByGameId(int gameId)
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

        public ReviewPostCharacter GetPostCharaterById(int id)
        {
            return _context.ReviewPostCharacter
                           .FirstOrDefault(c => c.Id == id);
        }

        public List<ReviewPostCharacter> GetPostCharacterByReviewPostId(int id)
        {
            return _context.ReviewPostCharacter
                        .Where(c => c.ReviewPostId == id)
                        .ToList();
        }

        public void AddCharacterToPost(ReviewPostCharacter reviewPostCharacter)
        {
            _context.ReviewPostCharacter.Add(reviewPostCharacter);
            _context.SaveChanges();
        }

        public void RemoveCharacterFromPost(int id)
        {
            var reviewPostCharacter = GetPostCharaterById(id);
            _context.ReviewPostCharacter.Remove(reviewPostCharacter);
            _context.SaveChanges();
        }
    }
}
