using FrameAdvance.Data;
using FrameAdvance.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Repositories
{
    public class ReviewPostRepository
    {

        private readonly ApplicationDbContext _context;

        public ReviewPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ReviewPost> GetAll()
        {
            return _context.ReviewPost
                           .Include(p => p.UserProfile)
                           .Include(p => p.Game)
                           .ThenInclude(g => g.UserGames)
                           .ThenInclude(ug => ug.SkillLevel)
                           .Include(p => p.ReviewPostCharacters)
                           .ThenInclude(pc => pc.Character)
                           .Where(p => p.Private == false)
                           .OrderByDescending(p => p.CreateDateTime)
                           .ToList();
        }

        public List<ReviewPost> GetByUserProfileId(int id)
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

        public ReviewPost GetById(int id)
        {
            return _context.ReviewPost
                           .Include(p => p.Game)
                           .Include(p => p.UserProfile)
                           .ThenInclude(up => up.UserType)
                           .Include(p => p.ReviewPostCharacters)
                           .ThenInclude(pc => pc.Character)
                           .Include(p => p.Comments)
                           .ThenInclude(c => c.UserProfile)
                           .Select(p => new ReviewPost
                           {
                               Id = p.Id,
                               Title = p.Title,
                               CreateDateTime = p.CreateDateTime,
                               Private = p.Private,
                               UserProfileId = p.UserProfileId,
                               UserProfile = p.UserProfile,
                               Comments = (List<Comment>)p.Comments.OrderByDescending(c => c.CreateDateTime),
                               ReviewPostCharacters = p.ReviewPostCharacters,
                               Game = p.Game
                           })
                           .FirstOrDefault(p => p.Id == id);
        }


        public List<ReviewPost> GetByGameId(int gameId)
        {
            return _context.ReviewPost
                           .Include(p => p.UserProfile)
                           .Include(p => p.Game)
                           .Include(p => p.ReviewPostCharacters)
                           .ThenInclude(pc => pc.Character)
                           .Where(p => p.GameId == gameId)
                           .OrderByDescending(p => p.CreateDateTime)
                           .ToList();
        }

        public void Add(ReviewPost reviewPost)
        {
            reviewPost.CreateDateTime = DateTime.Now;
            _context.Add(reviewPost);
            _context.SaveChanges();
        }

        public void Update(ReviewPost reviewPost)
        {
            _context.Entry(reviewPost).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            var savedPostRelationships = GetSavedReviewByReviewPostId(id);
            if (savedPostRelationships != null)
            {
                _context.SavedReview.RemoveRange(savedPostRelationships);
            }

            _context.ReviewPost.Remove(post);
            _context.SaveChanges();
        }


        //Saving post review repo methods start here
        public SavedReview GetSavedReviewById(int id)
        {
            return _context.SavedReview
                           .FirstOrDefault(sr => sr.Id == id);
        }

        public SavedReview GetSavedReviewByReviewPostId(int id)
        {
            return _context.SavedReview
                        .FirstOrDefault(sr => sr.ReviewPostId == id);

        }
        public void SaveReview(SavedReview savedReview)
        {
            _context.SavedReview.Add(savedReview);
            _context.SaveChanges();
        }

        public void RemoveSavedReview(int id)
        {
            var savedReview = GetSavedReviewById(id);
            _context.SavedReview.Remove(savedReview);
            _context.SaveChanges();
        }


    }
}
