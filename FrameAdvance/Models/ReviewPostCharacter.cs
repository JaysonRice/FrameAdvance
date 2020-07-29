using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class ReviewPostCharacter
    {
        public int Id { get; set; }

        public int ReviewPostId { get; set; }

        public int CharacterId { get; set; }

        public ReviewPost ReviewPost { get; set; }

        public Character Character { get; set; }
    }
}
