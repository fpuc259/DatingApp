using Microsoft.EntityFrameworkCore;
using DatingApp.api.Models;
namespace DatingApp.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)  {}
        public DbSet<Value> Values { get; set;}
        public DbSet<User> Users { get; set; }
    }
}