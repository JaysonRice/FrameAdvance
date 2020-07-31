using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class UserGame
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required]
        public int SkillLevelId { get; set; }
        public SkillLevel SkillLevel { get; set; }

        [Required]
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
