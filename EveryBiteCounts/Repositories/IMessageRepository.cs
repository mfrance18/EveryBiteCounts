using EveryBiteCounts.Models;
using System.Collections.Generic;

namespace EveryBiteCounts.Repositories
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(int id);
        void EditMessage(Message message);
        List<Message> GetMessagesByUserId(int id);
    }
}