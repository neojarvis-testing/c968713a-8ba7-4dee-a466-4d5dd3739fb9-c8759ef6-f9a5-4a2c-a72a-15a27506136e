using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;


namespace dotnetapp.Controllers
{
    [Route("api/loan-application")]
    [ApiController]
    public class LoanApplicationController : ControllerBase
    {
        private readonly LoanApplicationService _loanApplicationService;

        public LoanApplicationController(LoanApplicationService loanApplicationService)
        {
            _loanApplicationService = loanApplicationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanApplication>>> GetAllLoanApplications()
        {
            try
            {
                var loanApplications = await _loanApplicationService.GetAllLoanApplications();
                return Ok(loanApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<LoanApplication>>> GetLoanApplicationsByUserId(int userId)
        {
            try
            {
                var loanApplications = await _loanApplicationService.GetLoanApplicationsByUserId(userId);
                if (loanApplications == null || !loanApplications.Any())
                    return NotFound("Cannot find any loan application");

                return Ok(loanApplications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddLoanApplication([FromBody] LoanApplication loanApplication)
        {
            try
            {
                var result = await _loanApplicationService.AddLoanApplication(loanApplication);
                return Ok("Loan application added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{loanApplicationId}")]
        public async Task<ActionResult> UpdateLoanApplication(int loanApplicationId, [FromBody] LoanApplication loanApplication)
        {
            try
            {
                var result = await _loanApplicationService.UpdateLoanApplication(loanApplicationId, loanApplication);
                if (!result)
                    return NotFound("Cannot find any loan application");

                return Ok("Loan application updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{loanApplicationId}")]
        public async Task<ActionResult> DeleteLoanApplication(int loanApplicationId)
        {
            try
            {
                var result = await _loanApplicationService.DeleteLoanApplication(loanApplicationId);
                if (!result)
                    return NotFound("Cannot find any loan application");

                return Ok("Loan application deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}