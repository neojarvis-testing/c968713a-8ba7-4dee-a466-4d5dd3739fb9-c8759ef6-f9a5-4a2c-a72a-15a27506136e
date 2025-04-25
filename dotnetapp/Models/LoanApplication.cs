using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class LoanApplication
    {
         public int LoanApplicationId { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int LoanId { get; set; }
        public Loan? Loan { get; set; }
        public DateTime SubmissionDate { get; set; }
        public int LoanStatus { get; set; }
        public string FarmLocation { get; set; }
        public string FarmerAddress { get; set; }
        public decimal FarmSizeInAcres { get; set; }
        public string FarmPurpose { get; set; }
        public string File { get; set; }
    }
}