using Microsoft.EntityFrameworkCore;
using FrameAdvance.Models;

namespace FrameAdvance.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Character> Character { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Game> Game { get; set; }
        public DbSet<ReviewPost> ReviewPost { get; set; }
        public DbSet<SavedReview> SavedReview { get; set; }
        public DbSet<SkillLevel> SkillLevel { get; set; }
        public DbSet<Timestamp> Timestamp { get; set; }
        public DbSet<UserGame> UserGame { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserType> UserType { get; set; }

    }
}