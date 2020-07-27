using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FrameAdvance.Controllers
{
    public class UserProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
