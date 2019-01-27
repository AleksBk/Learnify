using Learnify.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Learnify.Controllers
{
    [Route("api/[controller]")]
    public class AccountController
    {
        [HttpGet("[action]")]
        public async Task<LoginResult> Login(string login, string password)
        {
            return new LoginResult()
            {
                Token = Guid.NewGuid().ToString(),
                Login = login
            };
        }
    }
}