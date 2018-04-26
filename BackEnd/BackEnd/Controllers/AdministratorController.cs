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
    public class AdministratorController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Administrator
        public IQueryable<Administrator> GetAdministrators()
        {
            return db.Administrators;
        }

        // GET: api/Administrator/5
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult GetAdministrator(int id)
        {
            Administrator administrator = db.Administrators.Find(id);
            if (administrator == null)
            {
                return NotFound();
            }

            return Ok(administrator);
        }

        // ----------------------------------------------------

        [HttpGet]
        [Route("api/GetAdminClaims")]
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult GetAdminClaims(string email, string password)
        {
            var administrator = db.Administrators.Where(x => x.Email.Equals(email)
                && x.Password.Equals(password)).FirstOrDefault();

            if (administrator.Email == null && administrator.Password == null)
            {
                return (null);
            }
            else
            {
                return Ok(administrator);
            }
        }







        // PUT: api/Administrator/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAdministrator(int id, Administrator administrator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != administrator.AdminID)
            {
                return BadRequest();
            }

            db.Entry(administrator).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministratorExists(id))
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

        // POST: api/Administrator
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult PostAdministrator(Administrator administrator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Administrators.Add(administrator);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = administrator.AdminID }, administrator);
        }

        // DELETE: api/Administrator/5
        [ResponseType(typeof(Administrator))]
        public IHttpActionResult DeleteAdministrator(int id)
        {
            Administrator administrator = db.Administrators.Find(id);
            if (administrator == null)
            {
                return NotFound();
            }

            db.Administrators.Remove(administrator);
            db.SaveChanges();

            return Ok(administrator);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AdministratorExists(int id)
        {
            return db.Administrators.Count(e => e.AdminID == id) > 0;
        }
    }
}