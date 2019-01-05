using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Learnify.Models;

namespace Learnify.Controllers
{
    [Route("api/[controller]")]
    public class CoursesController
    {
        [HttpGet("[action]")]
        public async Task<CourseDetailsDto> Get(int id)
        {
            await Task.Delay(500);
            return new CourseDetailsDto() {
                Id = id,
                Name = "Example Course",
                Length = "2h 10m 45s",
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                Contents = new List<ContentDto>() {
                    new ContentDto() {
                        Id = 1,
                        Name = "Introduction"
                    },
                    new ContentDto() {
                        Id = 2,
                        Name = "Mathematical Base"
                    },
                    new ContentDto() {
                        Id = 3,
                        Name = "Advanced lesson"
                    },
                    new ContentDto() {
                        Id = 4,
                        Name = "Quadratic eqations, because why not?"
                    }
                }
            };
        }
    }
}