using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models.ViewModels
{
    public class GameSkillLevel
    {
        public int Id { get; set; }

        public Game Game { get; set; }

        public SkillLevel SkillLevel { get; set; }
    }
}
