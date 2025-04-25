using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations; // For validation attributes
using Microsoft.AspNetCore.Identity; // For IdentityUser

namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(30)]
        public string Name { get; set; } // User's name with a max length of 30 characters
    }
}