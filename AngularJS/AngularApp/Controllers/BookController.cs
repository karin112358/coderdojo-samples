using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularApp.Model;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;

namespace AngularApp.Controllers
{
    [Route("api/books")]
    public class BookController : Controller
    {
        // GET: api/books
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return new Book[] { new Book { Title = "Book 1", Price = 19.90M }, new Book { Title = "Book 2", Price = 13.80M } };
        }

		// GET api/books/5
		[HttpGet("{id}")]
        public Book Get(int id)
        {
			throw new NotImplementedException();
        }

		// POST api/books
		[HttpPost]
        public void Post([FromBody]Book value)
        {
			throw new NotImplementedException();
		}

		// PUT api/books/5
		[HttpPut("{id}")]
        public void Put(int id, [FromBody]Book value)
        {
			throw new NotImplementedException();
		}

		// DELETE api/books/5
		[HttpDelete("{id}")]
        public void Delete(int id)
        {
			throw new NotImplementedException();
		}
    }
}
