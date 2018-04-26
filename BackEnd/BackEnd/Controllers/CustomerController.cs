using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class CustomerController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Customer
        public IQueryable<Customer> GetCustomers()
        {
            return db.Customers;
        }

        // GET: api/Customer/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(string email)
        {
            var customer = db.Customers.Where(s => s.Email.Equals(email));
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // ----------------------------------------------------

        //[HttpGet]
        //[Route("api/GetCustomerClaims")]
        //[ResponseType(typeof(Customer))]
        //public IHttpActionResult GetCustomerClaims(string email, string password)
        //{
        //    //This Commented Code is Working
        //    //This Commented Code is Working
        //    //This Commented Code is Working

        //   var customer = db.Customers.Where(x => x.Email.Equals(email)
        //       && x.Password.Equals(password)).FirstOrDefault();

        //    if (customer.Email == null && customer.Password == null)
        //    {
        //        return (null);
        //    }
        //    else
        //    {
        //        return Ok(customer);
        //    }


        //}


        [HttpGet]
        [Route("api/GetCustomerClaims")]
        public Customer GetCustomerClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            Customer customer = new Customer()
            {
                CustomerID = Convert.ToInt32(identityClaims.FindFirst("CustomerID").Value),
                FirstName = identityClaims.FindFirst("FirstName").Value,
                LastName = identityClaims.FindFirst("LastName").Value,
                Email = identityClaims.FindFirst("Email").Value,
                Password = identityClaims.FindFirst("Password").Value,
                MobileNumber = identityClaims.FindFirst("MobileNumber").Value,
                Gender = identityClaims.FindFirst("Gender").Value,
                Birthday = identityClaims.FindFirst("Birthday").Value
            };

            return customer;
        }

        // ----------------------------------------------------


        // PUT: api/Customer/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {

            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customer
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {

            db.Customers.Add(customer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.CustomerID }, customer);
        }

        // DELETE: api/Customer/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.CustomerID == id) > 0;
        }
    }
}