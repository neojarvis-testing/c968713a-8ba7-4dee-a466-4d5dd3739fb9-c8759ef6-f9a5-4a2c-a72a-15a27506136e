using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
 
using dotnetapp.Services;
using dotnetapp.Models;
using dotnetapp.Exceptions;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/loan-application")]
    public class LoanApplicationController : ControllerBase
    {
        private readonly LoanApplicationService _loanApplicationService;
 
        public LoanApplicationController(LoanApplicationService loanApplicationService)
        {
            _loanApplicationService = loanApplicationService;
        }
 
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<LoanApplication>>> GetAllLoanApplications()
        {
            try
            {
                var loanApplications = await _loanApplicationService.GetAllLoanApplications();
                return Ok(loanApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
 
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<LoanApplication>>> GetLoanApplicationsByUserId(int userId)
        {
            try
            {
                var loanApplications = await _loanApplicationService.GetLoanApplicationsByUserId(userId);
                if (loanApplications == null || !loanApplications.Any())
                {
                    return NotFound(new { message = "Cannot find any loan application" });
                }
                return Ok(loanApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
 
        [HttpPost]
       // [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult> AddLoanApplication([FromBody] LoanApplication loanApplication)
        {
            try
            {
                var success = await _loanApplicationService.AddLoanApplication(loanApplication);
                if (success)
                {
                    return Ok(new { message = "Loan Application added successfully" });
                }
                return BadRequest(new { message = "Failed to add loan application" });
            }
            catch (LoanException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
 
        [HttpPut("{loanApplicationId}")]
       // [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateLoanApplication(int loanApplicationId, [FromBody] LoanApplication loanApplication)
        {
            try
            {
                var success = await _loanApplicationService.UpdateLoanApplication(loanApplicationId, loanApplication);
                if (success)
                {
                    return Ok(new { message = "Loan application updated successfully" });
                }
                return NotFound(new { message = "Cannot find any loan application" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
 
        [HttpDelete("{loanApplicationId}")]
       // [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteLoanApplication(int loanApplicationId)
        {
            try
            {
                var success = await _loanApplicationService.DeleteLoanApplication(loanApplicationId);
                if (success)
                {
                    return Ok(new { message = "Loan Application deleted successfully" });
                }
                return NotFound(new { message = "Cannot find any loan application" });
            }
            catch (LoanException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }
    }
      
}