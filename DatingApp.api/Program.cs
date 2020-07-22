﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using DatingApp.api.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
           var host = CreateWebHostBuilder(args).Build();
           using (var scope = host.Services.CreateScope()) 
           {
               var services = scope.ServiceProvider;
               try {

                   var context = services.GetRequiredService<DataContext>();
                   context.Database.Migrate();
                   Seed.SeedUsers(context);
               }
               catch(Exception ex) 
               {
                   var logger= services.GetRequiredService<ILogger<Program>>();
                   logger.LogError(ex, "An error occured during migration");
               }
           }
           host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
