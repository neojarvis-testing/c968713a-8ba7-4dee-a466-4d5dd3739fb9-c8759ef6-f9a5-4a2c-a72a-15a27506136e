using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using dotnetapp.Services;
using dotnetapp.Models;
using dotnetapp.Exceptions;

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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetAllLoans()
        {
            try
            {
                var loans = await _loanService.GetAllLoans();
                return Ok(loans);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("{loanId}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<ActionResult> GetLoanById(int loanId)
        {
            try
            {
                var loan = await _loanService.GetLoanById(loanId);
                if (loan == null)
                {
                    return NotFound(new { message = "Cannot find any loan" });
                }
                return Ok(loan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddLoan([FromBody] Loan loan)
        {
            try
            {
                // **Check if the user is authenticated and has a valid token**
                var userRole = HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;
                if (string.IsNullOrEmpty(userRole) || userRole != "Admin")
                {
                    return Unauthorized(new { message = "Unauthorized access. Admin role required." });
                }

                // **Validate the Loan Request Body**
                if (loan == null || string.IsNullOrEmpty(loan.LoanType))
                {
                    return BadRequest(new { message = "Invalid loan details provided" });
                }

                // **Save the Loan into the Database**
                bool isAdded = await _loanService.AddLoan(loan);
                if (!isAdded)
                {
                    return StatusCode(500, new { message = "Failed to add loan due to an internal error." });
                }

                return Ok(new { message = "Loan added successfully" });
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

        [HttpPut("{loanId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateLoan(int loanId, [FromBody] Loan loan)
        {
            try
            {
                var updated = await _loanService.UpdateLoan(loanId, loan);
                if (!updated)
                {
                    return NotFound(new { message = "Cannot find any loan" });
                }
                return Ok(new { message = "Loan updated successfully" });
            }
            catch (LoanException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{loanId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteLoan(int loanId)
        {
            try
            {
                var deleted = await _loanService.DeleteLoan(loanId);
                if (!deleted)
                {
                    return NotFound(new { message = "Cannot find any loan" });
                }
                return Ok(new { message = "Loan deleted successfully" });
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