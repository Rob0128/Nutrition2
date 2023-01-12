using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Nutrition2.Models;

namespace Nutrition2.Controllers
{
    public class StatsController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
          
            var database = getmongoDB();
            var stats = database.GetCollection<StatsModel>("stats");
            var prods = database.GetCollection<ProductModel>("products2");
            var curUser = HttpContext.User.Identity.Name;

            var userLists = stats.Find(x => x.UserID == curUser).ToList<StatsModel>();
            userLists.Reverse();
            List<List<ProductModel>> shoppingLists = new List<List<ProductModel>>();
            foreach (var list in userLists)
            {
                List<ProductModel> productList = new List<ProductModel>();
                foreach(var item in list.IDList)
                {
                    var prod = prods.Find(x => x.ID.Equals(item)).FirstOrDefault();
                    productList.Add(prod);
                }
                shoppingLists.Add(productList);
            }

            ViewBag.curLists = shoppingLists;

            return View();
        }

        public IMongoDatabase getmongoDB()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false);
            IConfiguration configuration = builder.Build();
            string dbString = configuration.GetValue<string>("ConnectionStrings:MongoConnection");

            var settings = MongoClientSettings.FromConnectionString(dbString);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            MongoClient client = new MongoClient(settings);
            var database = client.GetDatabase("NutritionApp");
            return database;
        }
    }
}
