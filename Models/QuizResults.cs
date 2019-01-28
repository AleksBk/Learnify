using System;
using System.Collections.Generic;

namespace Learnify.Models
{

        public class QuizResults
        {
            public List<int> correctOnes {get;set;} = new List<int>();
            public Dictionary<int, String> invalidOnes {get;set;} = new Dictionary<int, String>();

        }
}