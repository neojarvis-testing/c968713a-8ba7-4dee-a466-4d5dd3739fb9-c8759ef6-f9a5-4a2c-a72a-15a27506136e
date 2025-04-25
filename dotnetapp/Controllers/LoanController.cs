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
    [Route("api/loan")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly LoanService _loanService;

        public LoanController(LoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetAllLoans()
        {
            try
            {
                var loans = await _loanService.GetAllLoans();
                return Ok(loans);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{loanId}")]
        public async Task<ActionResult<Loan>> GetLoanById(int loanId)
        {
            try
            {
                var loan = await _loanService.GetLoanById(loanId);
                if (loan == null)
                    return NotFound("Cannot find any loan");
                return Ok(loan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddLoan([FromBody] Loan loan)
        {
            try
            {
                var result = await _loanService.AddLoan(loan);
                return Ok("Loan added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{loanId}")]
        public async Task<ActionResult> UpdateLoan(int loanId, [FromBody] Loan loan)
        {
            try
            {
                var result = await _loanService.UpdateLoan(loanId, loan);
                if (!result)
                    return NotFound("Cannot find any loan");
                return Ok("Loan updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{loanId}")]
        public async Task<ActionResult> DeleteLoan(int loanId)
        {
            try
            {
                var result = await _loanService.DeleteLoan(loanId);
                if (!result)
                    return NotFound("Cannot find any loan");
                return Ok("Loan deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}