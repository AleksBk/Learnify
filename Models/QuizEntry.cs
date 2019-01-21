using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Learnify.Models
{
    public class QuizEntry
    {
        public Question Question { get; set; }

        [JsonIgnore]
        public string Answer { get; set; }

    }
}