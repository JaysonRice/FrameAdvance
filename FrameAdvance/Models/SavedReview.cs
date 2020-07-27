using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class SavedReview
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Required]
        public int ReviewPostId { get; set; }
        public ReviewPost ReviewPost { get; set; }
    }
}
