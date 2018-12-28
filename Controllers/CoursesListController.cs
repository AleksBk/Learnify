using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Learnify.Controllers
{
    public class CoursesListController : Controller
    {
        private static string[] CourseNames = new[]
       {
            "Math - basic", "Geographics - Lands and Oceans", "Basic English Words"
        };

        [HttpGet("[action]")]
        public IEnumerable<string> Courses()
        {
            return CourseNames;
        }
    }
}
