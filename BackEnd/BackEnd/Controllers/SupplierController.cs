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
    public class SupplierController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Supplier
        public IQueryable<Object> GetSuppliers()
        {
            var supplier = db.Suppliers
                .Select(x => new
                {
                    x.SupplierID,
                    x.CompanyName,
                    x.FirstName,
                    x.LastName,
                    x.Email,
                    x.Password
                });

            return supplier;
        }

        // GET: api/Supplier/5
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult GetSupplier(string email)
        {
            var supplier = db.Suppliers.Where(s => s.Email.Equals(email))
                .Select(x => new
                {
                    x.SupplierID,
                    x.CompanyName,
                    x.FirstName,
                    x.LastName,
                    x.Email,
                    x.Password
                });
            //Supplier supplier = db.Suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        [HttpGet]
        [Route("api/GetSupplier")]
        public IHttpActionResult GetSupplier(int id)
        {
            var supplier = db.Suppliers.Where(s => s.SupplierID.Equals(id))
                .Select(x => new
                {
                    x.SupplierID,
                    x.CompanyName,
                    x.FirstName,
                    x.LastName,
                    x.Email,
                    x.Password
                });

            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        // PUT: api/Supplier/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSupplier(int id, Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.SupplierID)
            {
                return BadRequest();
            }

            db.Entry(supplier).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Supplier
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult PostSupplier(Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Suppliers.Add(supplier);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = supplier.SupplierID }, supplier);
        }

        // DELETE: api/Supplier/5
        [ResponseType(typeof(Supplier))]
        public IHttpActionResult DeleteSupplier(int id)
        {
            Supplier supplier = db.Suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            db.Suppliers.Remove(supplier);
            db.SaveChanges();

            return Ok(supplier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupplierExists(int id)
        {
            return db.Suppliers.Count(e => e.SupplierID == id) > 0;
        }
    }
}