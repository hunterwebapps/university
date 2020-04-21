using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using University.Business.Auth;
using University.Business.Users;
using University.DataAccess;
using System.Text;

namespace University.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly string _defaultConnectionString;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            _defaultConnectionString = configuration.GetConnectionString("Default");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<ApplicationDbContext>(opts =>
            {
                var assemblyName = typeof(ApplicationDbContext).Namespace;
                opts.UseSqlServer(
                    _defaultConnectionString,
                    sqlOpts => sqlOpts.MigrationsAssembly(assemblyName));
            });

            services
                .AddMvcCore()
                .AddAuthorization();

            services
                .AddAuthentication(config =>
                {
                    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(config =>
                {
                    config.RequireHttpsMetadata = true;
                    config.SaveToken = true;
                    config.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["UniversityJwtSecret"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddCors(options =>
            {
                options.AddPolicy("Default", config =>
                {
                    config.WithOrigins(_configuration["AdminBaseUrl"])
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // AutoMapper
            var mapper = Mapper.Initialize();
            services.AddSingleton(mapper);

            // Managers
            services.AddTransient<AuthManager>();
            services.AddTransient<UserManager>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("Default");

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}

