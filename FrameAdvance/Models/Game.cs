﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrameAdvance.Models
{
    public class Game
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        public string ImageLocation { get; set; }

        public bool IsActive { get; set; }

        public List<UserGame> UserGames { get; set; } = new List<UserGame>();

    }
}
