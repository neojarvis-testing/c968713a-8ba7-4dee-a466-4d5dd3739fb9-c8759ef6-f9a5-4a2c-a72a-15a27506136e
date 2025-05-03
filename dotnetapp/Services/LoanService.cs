using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Exceptions; // Assuming you created this namespace for exceptions
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
namespace dotnetapp.Services
{
    public class LoanService
    {
        private readonly ApplicationDbContext _context;
        public LoanService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Loan>> GetAllLoans()
        {
            return await _context.Loans.ToListAsync();
        }
        public async Task<Loan> GetLoanById(int loanId)
        {
            return await _context.Loans.FindAsync(loanId);
        }
        [HttpPost]
        public async Task<bool> AddLoan(Loan loan)
        {
            if (await _context.Loans.AnyAsync(l => l.LoanType == loan.LoanType))
            {
                throw new LoanException("Loan with the same type already exists");
            }
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateLoan(int loanId, Loan loan)
        {
            var existingLoan = await _context.Loans.FindAsync(loanId);
            if (existingLoan == null)
            {
                return false;
            }
            if (await _context.Loans.AnyAsync(l => l.LoanType == loan.LoanType && l.LoanId != loanId))
            {
                throw new LoanException("Loan with the same type already exists");
            }
            existingLoan.LoanType = loan.LoanType;
            existingLoan.Description = loan.Description;
            existingLoan.InterestRate = loan.InterestRate;
            existingLoan.MaximumAmount = loan.MaximumAmount;
            existingLoan.RepaymentTenure = loan.RepaymentTenure;
            existingLoan.Eligibility = loan.Eligibility;
            existingLoan.DocumentsRequired = loan.DocumentsRequired;
            _context.Loans.Update(existingLoan);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteLoan(int loanId)
        {
            var loan = await _context.Loans.FindAsync(loanId);
            if (loan == null)
            {
                return false;
            }
            if (await _context.LoanApplications.AnyAsync(la => la.LoanId == loanId))
            {
                throw new LoanException("Loan cannot be deleted, it is referenced in loanapplication");
            }
            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}