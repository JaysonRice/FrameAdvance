﻿using FrameAdvance.Data;
using FrameAdvance.Models;
using FrameAdvance.Models.ViewModels;
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

        public List<ReviewPostView> GetAllPostList()
        {
            return _context.ReviewPost
                 .Include(p => p.UserProfile)
                 .Include(p => p.Game)
                 .ThenInclude(g => g.UserGames)
                 .ThenInclude(ug => ug.SkillLevel)
                 .Include(p => p.ReviewPostCharacters)
                 .ThenInclude(pc => pc.Character)
                 .OrderByDescending(p => p.CreateDateTime)
                 .Select(p => new ReviewPostView()
                {
                    Id = p.Id,
                    Title = p.Title,
                    CreateDateTime = p.CreateDateTime,
                    UserProfile = p.UserProfile,
                    UserProfileId = p.UserProfileId,
                    UserGames = p.Game.UserGames,
                    Game = p.Game,
                    GameId = p.GameId,
                    Characters = p.ReviewPostCharacters.Select(c => c.Character).ToList(),
                })
                .ToList();
        }

        public List<ReviewPostView> GetByUserProfileId(int id)
        {
            return _context.ReviewPost
                 .Where(p => p.UserProfileId == id)
                 .Include(p => p.UserProfile)
                 .Include(p => p.Game)
                 .ThenInclude(g => g.UserGames)
                 .ThenInclude(ug => ug.SkillLevel)
                 .Include(p => p.ReviewPostCharacters)
                 .ThenInclude(pc => pc.Character)
                 .Select(p => new ReviewPostView()
                 {
                     Id = p.Id,
                     Title = p.Title,
                     CreateDateTime = p.CreateDateTime,
                     UserProfile = p.UserProfile,
                     UserProfileId = p.UserProfileId,
                     UserGames = p.Game.UserGames,
                     Game = p.Game,
                     GameId = p.GameId,
                     Characters = p.ReviewPostCharacters.Select(c => c.Character).ToList(),

                 })
                .ToList();    
        }

        public ReviewPost CheckPost(int id)
        {
            return _context.ReviewPost
                .FirstOrDefault(p => p.Id == id);
        }

        public ReviewPostDetailsView GetById(int id)
        {
            return _context.ReviewPost
                           .Include(p => p.Game)
                           .Include(p => p.Timestamps)
                           .Include(p => p.UserProfile)
                           .ThenInclude(up => up.UserType)
                           .Include(p => p.ReviewPostCharacters)
                           .ThenInclude(pc => pc.Character)
                           .Include(p => p.Comments)
                           .ThenInclude(c => c.UserProfile)
                           .Select(p => new ReviewPostDetailsView
                           {
                               Id = p.Id,
                               Title = p.Title,
                               CreateDateTime = p.CreateDateTime,
                               Private = p.Private,
                               VideoLocation = p.VideoLocation,
                               UserProfileId = p.UserProfileId,
                               Username = p.UserProfile.Username,
                               Comments = (List<Comment>)p.Comments.OrderByDescending(c => c.CreateDateTime),
                               Timestamps = (List<Timestamp>)p.Timestamps.OrderBy(t => t.Time),
                               Characters = p.ReviewPostCharacters.Select(c => c.Character).ToList(),
                               GameId = p.GameId,
                               Game = p.Game
                           })
                           .FirstOrDefault(p => p.Id == id);
        }

        public ReviewPost GetPostById(int id)
        {
            return _context.ReviewPost
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
            var post = GetPostById(id);
            var savedPostRelationships = GetSavedReviewByReviewPostId(id);
            var timestamps = GetTimestampsByPostId(id);

            if (savedPostRelationships != null)
            {
                _context.SavedReview.RemoveRange(savedPostRelationships);
            }

            if (timestamps != null)
            {
                _context.Timestamp.RemoveRange(timestamps);
            }

            _context.ReviewPost.Remove(post);
            _context.SaveChanges();
        }


        // Timestamp repo methods start here

        public Timestamp GetTimestampById(int id)
        {
            return _context.Timestamp
                 .FirstOrDefault(t => t.Id == id);
        }

        public List<Timestamp> GetTimestampsByPostId(int id)
        {
            return _context.Timestamp
                 .Where(t => t.ReviewPostId == id)
                 .OrderByDescending(t => t.Time)
                 .ToList();
        }

        public void AddTimestamp(Timestamp timestamp)
        {
            _context.Timestamp.Add(timestamp);
            _context.SaveChanges();
        }

        public void UpdateTimestamp(Timestamp timestamp)
        {
            _context.Entry(timestamp).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteTimestamp(int id)
        {
            var timestamp = GetTimestampById(id);
            _context.Timestamp.Remove(timestamp);
            _context.SaveChanges();
        }


        // Comment repo methods start here

        public Comment GetCommentById(int id)
        {
            return _context.Comment
                 .FirstOrDefault(c => c.Id == id);
        }

        public void AddComment(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            _context.Comment.Add(comment);
            _context.SaveChanges();
        }

        public void UpdateComment(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteComment(int id)
        {
            var comment = GetCommentById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }


        //Saving post review repo methods start here
        public SavedReview GetSavedReviewById(int id)
        {
            return _context.SavedReview
                           .FirstOrDefault(sr => sr.Id == id);
        }

        private List<SavedReview> GetSavedReviewByReviewPostId(int id)
        {
            return _context.SavedReview
                        .Where(sr => sr.ReviewPostId == id)
                        .ToList();
        }

        public List<SavedReview> GetSavedReviewByUserId(int id)
        {
            return _context.SavedReview
                        .Where(sr => sr.UserProfileId == id)
                        .Include(sr => sr.ReviewPost)
                        .OrderBy(sr => sr.ReviewPost.Title)
                        .ToList();
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
