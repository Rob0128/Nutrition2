using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Nutrition2.Models
{

    public class StatsModel
    {
        public StatsModel(string userID, List<string> prodList)
        {
            UserID = userID;
            IDList = prodList;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? UserID { get; set; }

        public List<string>? IDList { get; set; }

    }

    
}