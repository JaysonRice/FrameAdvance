using FrameAdvance.Data;
using FrameAdvance.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private Comment GetById(int id)
        {
            return _context.Comment.FirstOrDefault(c => c.Id == id);
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var comment = GetById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}
