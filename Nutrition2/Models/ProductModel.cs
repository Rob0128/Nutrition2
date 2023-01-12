using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Nutrition2.Models
{
    public class ProductModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ID { get; set; }
        public string? title { get; set; }
        public string? category_broad { get; set; }
        public string? category_specific { get; set; }
        public string? item_link { get; set; }
        public string? serving_description { get; set; }
        public string? energy_kj { get; set; }
        public string? energy_cal { get; set; }
        public string? fat_total { get; set; }
        public string? fat_saturated { get; set; }
        public string? carb { get; set; }
        public string? sugar { get; set; }
        public string? fibre { get; set; }
        public string? protein { get; set; }
        public string? salt { get; set; }
        public string? meat_or_veg { get; set; }
        public int? index { get; set; }



    }
}