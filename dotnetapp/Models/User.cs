using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class User
    {

        public int UserId { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string Username { get; set; }

        public string MobileNumber { get; set; }

        public string UserRole { get; set; }


        [JsonIgnore]
        public ICollection<LoanApplication>? LoanApplications {get;set;}
        [JsonIgnore]
        public ICollection<Feedback>? Feedbacks {get;set;}
    }
}
