using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NHibernate;
using RSRL.Api.Audit.Models;
using RSRL.Api.Users.Services;

namespace RSRL.Api.Audit.Services
{
    public class NHibernateActionLogger : IActionLogger
    {
        private readonly ISession session;
        private readonly IUserRepository userRepository;

        public NHibernateActionLogger(ISession session, IUserRepository userRepository)
        {
            this.session = session;
            this.userRepository = userRepository;
        }

        private async Task SaveAsync(ActionLog log)
        {
            await session.SaveAsync(log);
        }

        public IEnumerable<ActionLog> GetLogs()
        {
            return session.Query<ActionLog>();
        }

        public async Task AddActionLogAsync(string description, ActionType actionType, int userId = default)
        {
            await AddActionLogAsync(description, actionType.ToString(), userId);
        }

        public async Task AddActionLogAsync(string description, string actionType, int userId = default)
        {
            await SaveAsync(new ActionLog
            {
                Description = description,
                Executor = await userRepository.GetByIdOrDefaultAsync(userId),
                Type = actionType,
                ExecutionDate = DateTime.Now,
            });
        }
    }
}
