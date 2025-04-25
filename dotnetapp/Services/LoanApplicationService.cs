using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class LoanApplicationService
    {
        private readonly ApplicationDbContext _context;

        public LoanApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LoanApplication>> GetAllLoanApplications()
        {
            return _context.LoanApplications.ToList();
        }

        public async Task<IEnumerable<LoanApplication>> GetLoanApplicationsByUserId(int userId)
        {
            return _context.LoanApplications
                .Where(la => la.UserId == userId)
                .ToList();
        }

        public async Task<bool> AddLoanApplication(LoanApplication loanApplication)
        {
            if (_context.LoanApplications.Any(la => la.LoanId == loanApplication.LoanId && la.UserId == loanApplication.UserId))
                throw new LoanException("User already applied for this loan");

            _context.LoanApplications.Add(loanApplication);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateLoanApplication(int loanApplicationId, LoanApplication loanApplication)
        {
            var existingLoanApplication = await _context.LoanApplications.FindAsync(loanApplicationId);
            if (existingLoanApplication == null) return false;

            // Update properties
            existingLoanApplication.UserId = loanApplication.UserId;
            existingLoanApplication.LoanId = loanApplication.LoanId;
            existingLoanApplication.SubmissionDate = loanApplication.SubmissionDate;
            existingLoanApplication.LoanStatus = loanApplication.LoanStatus;
            existingLoanApplication.FarmLocation = loanApplication.FarmLocation;
            existingLoanApplication.FarmerAddress = loanApplication.FarmerAddress;
            existingLoanApplication.FarmSizeInAcres = loanApplication.FarmSizeInAcres;
            existingLoanApplication.FarmPurpose = loanApplication.FarmPurpose;
            existingLoanApplication.File = loanApplication.File;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteLoanApplication(int loanApplicationId)
        {
            var loanApplication = await _context.LoanApplications.FindAsync(loanApplicationId);
            if (loanApplication == null) return false;

            _context.LoanApplications.Remove(loanApplication);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}