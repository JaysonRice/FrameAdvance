using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class ReviewPostDetailsView
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        public string VideoLocation { get; set; }

        public bool Private { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public string Username { get; set; }

        public int GameId { get; set; }

        public Game Game { get; set; }

        public List<Comment> Comments { get; set; }

        public List<Timestamp> Timestamps { get; set; }

        public List<Character> Characters { get; set; }

    }
}
