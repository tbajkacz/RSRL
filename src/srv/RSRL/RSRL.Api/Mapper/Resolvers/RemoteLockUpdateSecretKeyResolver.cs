using AutoMapper;
using RSRL.Api.Locks.Models;
using RSRL.Api.Locks.Params;
using RSRL.Api.Locks.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RSRL.Api.Mapper.Resolvers
{
    public class RemoteLockUpdateSecretKeyResolver : IValueResolver<RemoteLockUpdateParams, RemoteLock, string>
    {
        private readonly IRemoteLockRepository lockRepository;

        public RemoteLockUpdateSecretKeyResolver(IRemoteLockRepository lockRepository)
        {
            this.lockRepository = lockRepository;
        }

        public string Resolve(RemoteLockUpdateParams source, RemoteLock destination, string destMember, ResolutionContext context)
        {
            return lockRepository.GetById(source.Id).SecretKey;
        }
    }
}
