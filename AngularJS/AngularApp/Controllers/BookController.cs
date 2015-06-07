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
		static Book[] books = new Book[] {
				new Book { Id = new Guid("c1af6450-d4d9-4954-846b-f90aa24611b0"), Title = "Book 1", Price = 19.90M },
				new Book { Id = new Guid("9e4f4d9a-0282-42e4-826a-91faf2928ce8"), Title = "Book 2", Price = 13.80M }
			};

		// GET: api/books
		[HttpGet]
        public IEnumerable<Book> Get()
        {
			return books;
        }

		// GET api/books/5
		[HttpGet("{id}")]
        public Book Get(Guid id)
        {
			return books.FirstOrDefault(b => b.Id == id);
        }

		// POST api/books
		[HttpPost]
        public void Post([FromBody]Book value)
        {
			throw new NotImplementedException();
		}

		// PUT api/books/5
		[HttpPut("{id}")]
        public void Put(Guid id, [FromBody]Book value)
        {
			var book = books.FirstOrDefault(b => b.Id == id);
			book.Title = value.Title;
			book.Price = value.Price;
		}

		// DELETE api/books/5
		[HttpDelete("{id}")]
        public void Delete(Guid id)
        {
			throw new NotImplementedException();
		}
    }
}
