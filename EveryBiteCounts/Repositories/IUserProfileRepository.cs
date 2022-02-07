using EveryBiteCounts.Models;
using System.Collections.Generic;

namespace EveryBiteCounts.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Update(UserProfile userProfile);
        UserProfile GetUserById(int id);
        List<UserProfile> GetAllPotentialFriends(int userId);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        List<UserProfile> GetFriends(int id);
    }
}