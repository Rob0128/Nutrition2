using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Web;
using Nutrition2.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Text.Json;
using Newtonsoft.Json;

namespace Nutrition2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private List<ProductModel>  prodList = new List<ProductModel>();
        private List<ProductModel>  customerList = new List<ProductModel>();

        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;

            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false);
            IConfiguration configuration = builder.Build();
            string dbString = configuration.GetValue<string>("ConnectionStrings:MongoConnection");

            var settings = MongoClientSettings.FromConnectionString(dbString);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            var database = client.GetDatabase("NutritionApp");
            var prods = database.GetCollection<ProductModel>("products2");
            /*            ProductModel fne = prods.Find<ProductModel>(x => x.title == "Waitrose Summer Southern Spiced Citrus Chicken Thigh650g").First();*/
            prodList = prods.Find(x => true).ToList();
        }


        [HttpGet]
        public List<ProductModel> GetProds()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false);
            IConfiguration configuration = builder.Build();
            string dbString = configuration.GetValue<string>("ConnectionStrings:MongoConnection");

            var settings = MongoClientSettings.FromConnectionString(dbString);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            var database = client.GetDatabase("NutritionApp");
            var prods = database.GetCollection<ProductModel>("products2");
            /*            ProductModel fne = prods.Find<ProductModel>(x => x.title == "Waitrose Summer Southern Spiced Citrus Chicken Thigh650g").First();*/
            prodList = prods.Find(x => true).ToList();
            // var returnList = JsonSerializer.Serialize<List<ProductModel>>(prodList);
            //return prodList;
            return prodList.GetRange(0, 40);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult AddToList(string id)
        {
            var currentProd = prodList.Find(x => x.ID == id);

            return PartialView(currentProd);
        }

        public ProductModel AddProduct(string id)
        {
            var currentProd = prodList.Find(x => x.ID == id);
            return currentProd;
        }

        [HttpPost]
        public List<ProductModel> Search(string keyWord = "", int carb = 0, int fat_tot = 0)
        {
            if (keyWord == null)
            {
                keyWord = "";
            }
            var model = new List<ProductModel>();
            if (keyWord == "")
            {
                if (carb > 0 || fat_tot > 0)
                {
                    /*if (carb == 0)
                    {
                        carb 
                    }*/
                    var searchProds = prodList.FindAll(x => Convert.ToInt64(Math.Floor(Convert.ToDouble(x.carb))) <= carb && Convert.ToInt64(Math.Floor(Convert.ToDouble(x.fat_total))) <= fat_tot);
                    return searchProds;
                }
                else
                {
                    var searchProds = prodList.FindAll(x => true).GetRange(0,100);
                    return searchProds;
                }
            }
            else
            {
                if (carb > 0 || fat_tot > 0)
                {
                    var searchProds = prodList.FindAll(x => x.title.ToLower().Contains(keyWord.ToLower()) && Convert.ToInt64(Math.Floor(Convert.ToDouble(x.carb))) <= carb && Convert.ToInt64(Math.Floor(Convert.ToDouble(x.fat_total))) <= fat_tot);
                    return searchProds;
                }
                else
                {
                    var searchProds = prodList.FindAll(x => x.title.ToLower().Contains(keyWord.ToLower()));
                    return searchProds;
                }
            }

        }

        public void SaveList(List<ProductModel> prodsToSave)
        {
            var db = getmongoDB();
            var stats = db.GetCollection<StatsModel>("stats");

            var curUser = HttpContext.User.Identity.Name;
            if (curUser != null)
            {
                List<string> prodIDS = new List<string>();
                foreach (var prod in prodsToSave)
                {
                    prodIDS.Add(prod.ID);
                }
                var StatItem = new StatsModel(curUser, prodIDS);
                
                stats.InsertOne(StatItem);
            }
         
        }

        public IMongoDatabase getmongoDB()
        {
            var settings = MongoClientSettings.FromConnectionString("mongodb+srv://rob:green28@cluster0.gmiu7.mongodb.net/?retryWrites=true&w=majority");
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            MongoClient client = new MongoClient(settings);
            var database = client.GetDatabase("NutritionApp");
            return database;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}