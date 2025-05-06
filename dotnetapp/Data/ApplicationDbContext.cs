using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
 
namespace dotnetapp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
 
        public DbSet<User> Users { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<LoanApplication> LoanApplications { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
 
            // Define relationships
            modelBuilder.Entity<LoanApplication>()
                .HasOne(la => la.User)
                .WithMany(u => u.LoanApplications)
                .HasForeignKey(la => la.UserId);
                
 
            modelBuilder.Entity<LoanApplication>()
                .HasOne(la => la.Loan)
                .WithMany(l => l.LoanApplications)
                .HasForeignKey(la => la.LoanId);
               
 
            modelBuilder.Entity<Feedback>()
                .HasOne(fb => fb.User)
                .WithMany(u => u.Feedbacks)
                .HasForeignKey(fb => fb.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}