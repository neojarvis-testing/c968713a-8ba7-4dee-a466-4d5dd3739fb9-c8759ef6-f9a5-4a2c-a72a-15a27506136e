
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/loan")]
    public class LoanController : ControllerBase
    {
        private readonly LoanService _loanService;

        public LoanController(LoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet]
        [Authorize(Roles="Admin")]  // Enforce authentication
        public async Task<ActionResult<IEnumerable<Loan>>> GetAllLoans()
        {
            try
            {
                var loans = await _loanService.GetAllLoans();
                return Ok(loans); // Return JSON response for success
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = ex.Message }); // Return JSON response for server error
            }
        }

        [HttpGet("{loanId}")]
        [Authorize(Roles="Admin, User")]  // Enforce authentication
        public async Task<ActionResult> GetLoanById(int loanId)
        {
            try
            {
                var loan = await _loanService.GetLoanById(loanId);
                if (loan == null)
                {
                    return NotFound(new { message = "Cannot find any loan" }); // Return JSON response for not found
                }
                return Ok(loan); // Return JSON response for success
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = ex.Message }); // Return JSON response for server error
            }
        }

        [HttpPost]
        [Authorize(Roles="Admin")]  // Uncommented to enforce authentication
        public async Task<ActionResult> AddLoan([FromBody] Loan loan)
        {
            try
            {
                await _loanService.AddLoan(loan);
                return Ok(new { message = "Loan added successfully" }); // Return JSON response
            }
            catch (LoanException ex)
            {
                return BadRequest(new { message = ex.Message }); // Return JSON response
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = ex.Message }); // Return JSON response
            }
        }

        [HttpPut("{loanId}")]
        [Authorize(Roles="Admin")]  // Enforce authentication
        public async Task<ActionResult> UpdateLoan(int loanId, [FromBody] Loan loan)
        {
            try
            {
                var updated = await _loanService.UpdateLoan(loanId, loan);
                if (!updated)
                {
                    return NotFound(new { message = "Cannot find any loan" }); // Return JSON response
                }
                return Ok(new { message = "Loan updated successfully" }); // Return JSON response
            }
            catch (LoanException ex)
            {
                return BadRequest(new { message = ex.Message }); // Return JSON response
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = ex.Message }); // Return JSON response
            }
        }

        [HttpDelete("{loanId}")]
        [Authorize(Roles="Admin")]  // Enforce authentication
        public async Task<ActionResult> DeleteLoan(int loanId)
        {
            try
            {
                var deleted = await _loanService.DeleteLoan(loanId);
                if (!deleted)
                {
                    return NotFound(new { message = "Cannot find any loan" }); // Return JSON response
                }
                return Ok(new { message = "Loan deleted successfully" }); // Return JSON response
            }
            catch (LoanException ex)
            {
                return BadRequest(new { message = ex.Message }); 
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = ex.Message }); 
            }
        }
    }
}

