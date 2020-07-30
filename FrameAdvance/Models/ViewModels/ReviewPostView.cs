using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models.ViewModels
{
    public class ReviewPostView
    {

        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreateDateTime { get; set; }

        public UserProfile UserProfile { get; set; }

        public Game Game { get; set; }
  
        public List<ReviewPostCharacter>? ReviewPostCharacters { get; set; }
        public SkillLevel SkillLevel { get; set; }

    }
}
