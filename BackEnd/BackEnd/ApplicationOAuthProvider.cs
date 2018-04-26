using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using BackEnd.Models;
using System.Security.Claims;

namespace BackEnd
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            // This Commented Code is Working
            // This Commented Code is Working
            // This Commented Code is Working

            var db = new DBModel();

            var administrator = db.Administrators
                .FirstOrDefault(a => a.Email == context.UserName && a.Password == context.Password);

            var customer = db.Customers.FirstOrDefault(x => x.Email == context.UserName && x.Password == context.Password);

            var driver = db.Drivers
                .FirstOrDefault(d => d.Email == context.UserName && d.Password == context.Password);

            var supplier = db.Suppliers
                .FirstOrDefault(s => s.Email == context.UserName && s.Password == context.Password);

            if (customer != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim("CustomerID", customer.CustomerID.ToString()));
                identity.AddClaim(new Claim("Email", customer.Email));
                identity.AddClaim(new Claim("FirstName", customer.FirstName));
                identity.AddClaim(new Claim("LastName", customer.LastName));
                identity.AddClaim(new Claim("Password", customer.Password));
                identity.AddClaim(new Claim("MobileNumber", customer.MobileNumber));
                identity.AddClaim(new Claim("Gender", customer.Gender));
                identity.AddClaim(new Claim("Birthday", customer.Birthday));

                context.Validated(identity);
            }
            else if (administrator != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim("AdminID", administrator.AdminID.ToString()));
                identity.AddClaim(new Claim("Email", administrator.Email));
                identity.AddClaim(new Claim("FirstName", administrator.FirstName));
                identity.AddClaim(new Claim("LastName", administrator.LastName));

                context.Validated(identity);
            }
            else if (driver != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim("DriverID", driver.DriverID.ToString()));
                identity.AddClaim(new Claim("Email", driver.Email));
                identity.AddClaim(new Claim("FirstName", driver.FirstName));
                identity.AddClaim(new Claim("LastName", driver.LastName));

                context.Validated(identity);
            }
            else if (supplier != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim("SupplierID", supplier.SupplierID.ToString()));
                identity.AddClaim(new Claim("Email", supplier.Email));
                identity.AddClaim(new Claim("FirstName", supplier.FirstName));
                identity.AddClaim(new Claim("LastName", supplier.LastName));

                context.Validated(identity);
            }
            else
            {
                return;
            }


        }
    }
}