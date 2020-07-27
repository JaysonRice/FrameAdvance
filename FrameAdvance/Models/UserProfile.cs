using System.ComponentModel.DataAnnotations;

namespace FrameAdvance.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }


        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

    }
}