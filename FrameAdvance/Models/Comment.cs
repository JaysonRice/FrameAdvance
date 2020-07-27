using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int ReviewPostId { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

    }
}
