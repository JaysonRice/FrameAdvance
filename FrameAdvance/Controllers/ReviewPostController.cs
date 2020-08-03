﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FrameAdvance.Data;
using FrameAdvance.Models;
using FrameAdvance.Repositories;

namespace FrameAdvance.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewPostController : ControllerBase
    {
        private readonly ReviewPostRepository _reviewPostRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public ReviewPostController(ApplicationDbContext context)
        {
            _reviewPostRepository = new ReviewPostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reviewPostRepository.GetAll());
        }

        [HttpGet("postlist")]
        public IActionResult GetPostList()
        {

            return Ok(_reviewPostRepository.GetAllPostList());
        }

        [HttpGet("getbygame/{id}")]
        public IActionResult GetPostsByGame(int gameId)
        {
            return Ok(_reviewPostRepository.GetByGameId(gameId));
        }


        [HttpGet("getbyuser/{id}")]
        public IActionResult GetPostByUser(int id)
        {
            return Ok(_reviewPostRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var reviewPost = _reviewPostRepository.GetById(id);
            if (reviewPost == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(reviewPost);
            }
        }

        [HttpPost]
        public IActionResult Post(ReviewPost reviewPost)
        {
            _reviewPostRepository.Add(reviewPost);
            return CreatedAtAction("Get", new { id = reviewPost.Id }, reviewPost);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, ReviewPost reviewPost)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != reviewPost.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != reviewPost.Id)
            {
                return BadRequest();
            }

            _reviewPostRepository.Update(reviewPost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _reviewPostRepository.GetById(id);

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _reviewPostRepository.Delete(id);
            return NoContent();
        }

        // Timestamp controller methods start here

        [HttpPost("addtimestamp")]
        public IActionResult Post(Timestamp timestamp)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _reviewPostRepository.GetById(timestamp.ReviewPostId);
            timestamp.Notes = null;

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _reviewPostRepository.AddTimestamp(timestamp);
            return CreatedAtAction("Get", new { id = timestamp.Id }, timestamp);
        }

        [HttpPut("updatetimestamp/{id}")]
        public IActionResult Put(int id, Timestamp timestamp)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _reviewPostRepository.CheckPost(timestamp.ReviewPostId);


            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != timestamp.Id)
            {
                return BadRequest();
            }

            _reviewPostRepository.UpdateTimestamp(timestamp);
            return NoContent();
        }

        [HttpDelete("deletetimestamp/{id}")]
        public IActionResult DeleteTimestamp(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var timestamp = _reviewPostRepository.GetTimestampById(id);

            var post = _reviewPostRepository.GetById(timestamp.ReviewPostId);

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _reviewPostRepository.DeleteTimestamp(id);
            return NoContent();
        }


        // Saving review controller methods start here

        [HttpPost("savereview")]
        public IActionResult Post(SavedReview savedReview)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var chosenpPost = _reviewPostRepository.GetById(savedReview.ReviewPostId);

            if (currentUserProfile.Id == chosenpPost.UserProfileId)
            {
                return Unauthorized();
            }
            _reviewPostRepository.SaveReview(savedReview);
            return CreatedAtAction("Get", new { id = savedReview.Id }, savedReview);
        }

        [HttpDelete("savereview/{id}")]
        public IActionResult DeleteSavedReview(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var savedReview = _reviewPostRepository.GetSavedReviewById(id);

            var chosenPost = _reviewPostRepository.GetById(savedReview.ReviewPostId);

            if (currentUserProfile.Id != chosenPost.UserProfileId)
            {
                return Unauthorized();
            }

            _reviewPostRepository.RemoveSavedReview(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}