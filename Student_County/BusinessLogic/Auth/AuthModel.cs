using System.Text.Json.Serialization;

namespace Student_County.BusinessLogic.Auth
{
    public class AuthModel
    {
        public string? Message { get; set; }
        public bool IsAuthenticated { get; set; }

        [JsonIgnore]
        public string? Username { get; set; }

        [JsonIgnore]
        public string? Email { get; set; }

        [JsonIgnore]
        public List<string>? Roles { get; set; }
        public string? Token { get; set; }
        public DateTime? ExpiresOn { get; set; }

        [JsonIgnore]
        public string? RefreshToken { get; set; }

        [JsonIgnore]
        public DateTime RefreshTokenExpiration { get; set; }
    }
}