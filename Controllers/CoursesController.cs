using Learnify.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learnify.Controllers
{
    [Route("api/[controller]")]
    public class CoursesController
    {
        [HttpGet("[action]")]
        public async Task<CourseDetailsDto> Get(int id)
        {
            await Task.Delay(500);
            return new CourseDetailsDto()
            {
                Id = id,
                Name = "Example Course",
                Length = "2h 10m 45s",
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                Contents = new List<CourseItem>() {
                    new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=1vZ28SAgzKc&t=79s") {
                        Name = "Introduction",
                        Description = "Test"
                    },
                    new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=1vZ28SAgzKc&t=79s") {
                        Name = "Mathematical Base",
                        Description = "Test"
                    },
                    new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=1vZ28SAgzKc&t=79s") {
                        Name = "Advanced lesson",
                        Description = "Test"
                    },
                    new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=1vZ28SAgzKc&t=79s") {
                        Name = "Quadratic eqations, because why not?",
                        Description = "Test"
                    }
                }
            };
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Course>> GetAll()
        {
            await Task.Delay(500);
            return CourseNames;
        }

        [HttpGet("{courseId}/item/{courseItemName}")]
        public CourseItem courseItemDetails(int courseId, string courseItemName) {
            var CourseUuid = System.Guid.NewGuid().ToString();
            return new VideoCourseItem(CourseUuid, "https://www.youtube.com/watch?v=1vZ28SAgzKc&t=79s") {
                        Name = courseItemName,
                        Description = "Test"
                    };
        }


        private static List<Course> CourseNames = new List<Course>
        {
            new Course() { Name = "Math",Id = 1, Type = "Math", PictureUrl = "./pictures/math.jpg"},
            new Course() { Name = "Integrals" ,Id = 2, Type = "Math", PictureUrl = "./pictures/math.jpg"},
            new Course() { Name = "Derivatives", Id = 3, Type = "Math", PictureUrl = "./pictures/math.jpg"},
            new Course() { Name = "Derivatives", Id = 4, Type = "Math", PictureUrl = "./pictures/math.jpg"},
            new Course() { Name = "Thermodynamics", Id = 5, Type = "Phisics", PictureUrl = "./pictures/phisics.jpg"},
            new Course() { Name = "Basic English Words", Id = 6, Type = "English", PictureUrl = "./pictures/english.jpg" }
        };
    }
}