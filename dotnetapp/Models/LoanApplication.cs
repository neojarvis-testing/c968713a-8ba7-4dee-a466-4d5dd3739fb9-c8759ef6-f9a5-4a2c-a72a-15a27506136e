using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class LoanApplication
    {
        [Key]
        public int LoanApplicationId{get;set;}
        public int UserId{get;set;}
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User{get;set;}
        public int LoanId{get;set;}
        [ForeignKey("LoadId")]
        [JsonIgnore]
        public Loan? Loan{get;set;}
        public DateTime SubmissionDate{get;set;}
        public int LoanStatus{get;set;}
        public string FarmLocation{get;set;}
        public string FarmerAddress{get;set;}
        public decimal FarmSizeInAcres{get;set;}
        public string FarmPurpose{get;set;}
        public string File{get;set;}     
    }
}