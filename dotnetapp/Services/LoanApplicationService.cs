using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
 
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
            return await _context.LoanApplications.Include(la => la.Loan).Include(la => la.User).ToListAsync();
        }
 
        public async Task<IEnumerable<LoanApplication>> GetLoanApplicationsByUserId(int userId)
        {
            return await _context.LoanApplications
                .Where(la => la.UserId == userId)
                .Include(la => la.Loan)
                .ToListAsync();
        }
 
        public async Task<bool> AddLoanApplication(LoanApplication loanApplication)
        {
            var exists = await _context.LoanApplications
                .AnyAsync(la => la.UserId == loanApplication.UserId && la.LoanId == loanApplication.LoanId);
 
            if (exists) throw new Exception("User already applied for this loan");
 
            _context.LoanApplications.Add(loanApplication);
            await _context.SaveChangesAsync();
            return true;
        }
 
        public async Task<bool> UpdateLoanApplication(int loanApplicationId, LoanApplication loanApplication)
        {
            var existingLoanApplication = await _context.LoanApplications.FindAsync(loanApplicationId);
            if (existingLoanApplication == null) return false;
 
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
 
 
 
