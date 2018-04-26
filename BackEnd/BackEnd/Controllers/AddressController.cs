using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class AddressController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Address
        public IQueryable<Object> GetAddresses(int id)
        {
            var list = db.Customers.
                Join(db.Addresses,
                cust => cust.CustomerID, a => a.CustomerID,
                (cust, a) => new
                {
                    AddressID = a.AddressID,
                    CustomerID = cust.CustomerID,
                    RecipientName = a.RecipientName,
                    ContactNumber = a.ContactNumber,
                    Complex = a.Complex,
                    StreetName = a.StreetName,
                    Suburb = a.Suburb,
                    City = a.City,
                    PostalCode = a.PostalCode
                });

            var address = list.Where(c => c.CustomerID.Equals(id));

            if (address == null)
            {
                return (null);
            }

            return address;

            //return db.Addresses;
        }

        //[HttpGet]
        //[Route("api/GetAddress")]
        //[ResponseType(typeof(Address))]
        //public IHttpActionResult GetAddress(int id)
        //{
        //    var address = db.Addresses.FirstOrDefault(x => x.CustomerID == id);
        //    if (address == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(address);
        //}

        //// GET: api/Address/5
        //[ResponseType(typeof(Address))]
        //public IHttpActionResult GetAddress(int id)
        //{
        //    //Address address = db.Addresses.Find(id);
        //    var address = db.Addresses.FirstOrDefault(x => x.CustomerID == id);
        //    if (address == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(address);
        //}

        // PUT: api/Address/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAddress(int id, Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != address.AddressID)
            {
                return BadRequest();
            }

            db.Entry(address).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(id))
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

        // POST: api/Address
        [ResponseType(typeof(Address))]
        public IHttpActionResult PostAddress(Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Addresses.Add(address);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = address.AddressID }, address);
        }

        // DELETE: api/Address/5
        [ResponseType(typeof(Address))]
        public IHttpActionResult DeleteAddress(int id)
        {
            Address address = db.Addresses.Find(id);
            if (address == null)
            {
                return NotFound();
            }

            db.Addresses.Remove(address);
            db.SaveChanges();

            return Ok(address);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AddressExists(int id)
        {
            return db.Addresses.Count(e => e.AddressID == id) > 0;
        }
    }
}