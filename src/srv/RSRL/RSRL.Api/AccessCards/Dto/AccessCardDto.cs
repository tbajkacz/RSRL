using RSRL.Api.Users.Dto;

namespace RSRL.Api.AccessCards.Dto
{
    public class AccessCardDto
    {
        public string Id { get; set; }

        public UserAccountDto Owner { get; set; }
    }
}
