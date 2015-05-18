using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AngularApp.Model
{
	public class Book
	{
		[JsonProperty(PropertyName = "title")]
		public string Title { get; set; }
		[JsonProperty(PropertyName = "price")]
		public decimal Price { get; set; }
	}
}
