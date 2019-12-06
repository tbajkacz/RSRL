using RSRL.Api.Users.Dto;
using System;

namespace RSRL.Api.Audit.Dto
{
    public class ActionLogDto
    {
        public int Id { get; set; }

        public UserAccountDto Executor { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public DateTime ExecutionDate { get; set; }
    }
}
