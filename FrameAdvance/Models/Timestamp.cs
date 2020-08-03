using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class Timestamp
    {
        public int Id { get; set; }
        [Required]
        public int Time { get; set; }

        public string Notes { get; set; }

        [Required]
        public int ReviewPostId { get; set; }

    }
}
