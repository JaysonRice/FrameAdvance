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
        public string SkillLevelId { get; set; }

        [Required]
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
