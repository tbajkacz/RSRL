﻿namespace RSRL.Api.Auth.Services
{
    public interface IHashService
    {
        bool CompareHashes(string password, string hash);

        string Hash(string password);
    }
}