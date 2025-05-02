using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace dotnetapp.Models
{
    public class LoginModel
    {
        
        public string Email { get; set; }

       
        public string Password { get; set; }
    }
}