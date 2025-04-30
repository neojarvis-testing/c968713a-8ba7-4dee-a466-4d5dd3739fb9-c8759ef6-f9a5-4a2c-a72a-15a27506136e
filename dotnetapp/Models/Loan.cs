using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace dotnetapp.Models
{
    public class Loan
    {
        [Key]
        public int LoanId {get;set;}
        [Required]
        public string LoanType {get;set;}
        public string Description {get;set;}
        public decimal InterestRate {get;set;}
        public decimal MaximumAmount {get;set;}
        public int RepaymentTenure {get;set;}
        public string Eligibility {get;set;}
        public string DocumentsRequired {get;set;}=string.Empty;
 
        [JsonIgnore]
 
        public ICollection<LoanApplication>? LoanApplications { get; set; }
    }
}
 